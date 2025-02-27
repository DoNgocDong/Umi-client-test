import services from '@/services';
import React, { Key, ReactNode, useRef, useState } from 'react';
import { ProColumns, ProTable, PageContainer, ActionType } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { Button, message, notification } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import CreateBranch from '@/pages/branch/components/createBranch';
import UpdateBranch from '@/pages/branch/components/updateBranch';
import { RequestError } from '@umijs/max';

const { getBranchList, createBranch, updateBranch, deleteBranchIds } = services.Branch;

const handleCreateBranch = async (data: BranchTyping.BranchDTO) => {
  const hide = message.loading('Loading...');

  try {
    await createBranch( {...data} );
    hide();
    message.success('Created!');
    return true;
  } catch (error: RequestError | any) {
    const message = error?.response?.data?.error?.message || error?.response?.data || error?.message;
    notification.error(message);
    return false;
  }
};

const handleUpdateBranch = async (data: BranchTyping.BranchInfo) => {
  const hide = message.loading('Loading...');
  const updateData: BranchTyping.BranchDTO = {
    branchName: data.branchName,
    address: data.address,
    description: data.description    
  }

  try {
    await updateBranch(data.branchId, updateData);
    hide();
    message.success('Updated!');
    return true;
  } catch (error: RequestError | any) {
    const message = error?.response?.data?.error?.message || error?.response?.data || error?.message;
    notification.error(message);
    return false;
  }
}

const handleDeleteBranchIds = async (ids: String[]) => {
  const hide = message.loading('Loading...');

  try {
    await deleteBranchIds(ids);
    hide();
    message.success('Deleted!');
    return true;
  } catch (error: RequestError | any) {
    const message = error?.response?.data?.error?.message || error?.response?.data || error?.message;
    notification.error(message || 'Unknown Error!');
    return false;
  }
};

const Branch: React.FC = () => {
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [selectedRowKeysState, setSelectedRowKeys] = useState<Key[]>([]);
  const [updateRecord, setUpdateRecord] = useState<BranchTyping.BranchInfo>();
  const actionRef = useRef<ActionType>();

  const handleEdit = (record: BranchTyping.BranchInfo) => {
    setUpdateRecord(record)
    setUpdateModalVisible(true);
  };

  const columns: ProColumns<BranchTyping.BranchInfo>[] = [
    {
      title: 'ID',
      dataIndex: 'branchId',
      hideInForm: true,
      key: 'branchId',
      fixed: 'left',
      width: '20%'
    },
    {
      title: 'Name',
      dataIndex: 'branchName',
      key: 'branchName',
      colSize: 15,
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'Branch name is required!',
          },
        ],
      },
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'Address is required!',
          },
        ],
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      hideInForm: true,
      key: 'createdAt',
      render: (text) => {
        // Dùng dayjs để format lại giá trị
        return dayjs(text?.toLocaleString()).format('DD-MM-YYYY');
      },
    },
    {
      title: 'Action',
      fixed: 'right',
      width: '5%',
      render: (text: ReactNode, record: BranchTyping.BranchInfo) => (
        <>
          <a 
            href='javascript:;' 
            style={{ display: 'flex', justifyContent: 'center' }} 
            onClick={() => handleEdit(record)}
          >
            <EditOutlined />
          </a>
        </>
      )
    },
  ];

  return (
    <PageContainer>
      <ProTable<BranchTyping.BranchInfo>
        columns={columns}
        loading={loading}
        actionRef={actionRef}
        bordered={true}
        rowKey="branchId"
        request={async (params, sorter, filter) => {
          setLoading(true);
          const { data } = await getBranchList(params);
          setLoading(false);

          return {
            data: data.list_data,
            total: data.total,
            success: true
          }
        }}
        toolBarRender={() => [
          <Button
            icon={<PlusOutlined />}
            type="primary" color='cyan' variant='solid'
            onClick={() => {
              setCreateModalVisible(true);
            }}
          >
            Thêm mới
          </Button>
        ]}
        pagination={{
          pageSize: 10
        }}
        rowSelection={{
          selectedRowKeys: selectedRowKeysState,
          onChange: (selectedKeys: Key[], selectedRows: BranchTyping.BranchInfo[]) => {
            setSelectedRowKeys(selectedKeys)
          }
        }}
        tableAlertOptionRender={() => {
          return (
            <Button
              icon={<DeleteOutlined />}
              color='danger' variant='dashed'
              onClick={async () => {
                setLoading(true);

                const deleted = await handleDeleteBranchIds(
                  selectedRowKeysState.map(key => String(key))
                );

                if(deleted) {
                  setSelectedRowKeys([]);
                  if (actionRef.current) {
                    await actionRef.current.reload();
                  }
                }

                setLoading(false);
              }}
            >
              Xóa
            </Button>
          );
        }}
        scroll={{
          x: 'max-content'
        }}
      />

      <CreateBranch
        onCancel={() => setCreateModalVisible(false)}
        visible={createModalVisible}
      >
        <ProTable<BranchTyping.BranchInfo, BranchTyping.BranchDTO>
          onSubmit={async (value) => {
            setLoading(true);
            const success = await handleCreateBranch(value);
            setLoading(false);

            if (success) {
              setCreateModalVisible(false);
              if (actionRef.current) {
                await actionRef.current.reload();
              }
            }
          }}
          rowKey="branchId"
          type="form"
          columns={columns}
        />
      </CreateBranch>

      <UpdateBranch 
        visible={updateModalVisible} 
        onCancel={() => setUpdateModalVisible(false)} 
        data={updateRecord} 
        onUpdate={async (data: BranchTyping.BranchInfo) => {
          setLoading(true);
          const success = await handleUpdateBranch(data);
          setLoading(false);

          if (success) {
            setUpdateModalVisible(false);
            if (actionRef.current) {
              await actionRef.current.reload();
            }
          }
        }}>
      </UpdateBranch>
    </PageContainer>
  );
};

export default Branch;
