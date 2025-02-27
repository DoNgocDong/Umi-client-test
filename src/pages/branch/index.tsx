import services from '@/services';
import React, { Key, useRef, useState } from 'react';
import { ProColumns, ProTable, PageContainer, ActionType } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { Button, message, notification } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import CreateBranch from '@/pages/branch/components/createBranch';
import { RequestError } from '@umijs/max';

const { getBranchList, createBranch, deleteBranchIds } = services.Branch;

const handleCreateBranch = async (data: BranchTyping.BranchDTO) => {
  const hide = message.loading('Loading...');

  try {
    await createBranch( {...data} );
    hide();
    message.success('Success!');
    return true;
  } catch (error: RequestError | any) {
    const message = error?.response?.data?.error?.message || error?.response?.data || error?.message;
    notification.error(message);
    return false;
  }
};

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
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<BranchTyping.BranchInfo>[] = [
    {
      title: 'ID',
      dataIndex: 'branchId',
      hideInForm: true,
      key: 'branchId',
      width: '30%',
      fixed: 'left',
    },
    {
      title: 'Name',
      dataIndex: 'branchName',
      key: 'branchName',
      fixed: 'left',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'Name is required!',
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
            message: 'Name is required!',
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
  ];

  return (
    <PageContainer>
      <ProTable<BranchTyping.BranchInfo>
        columns={columns}
        loading={loading}
        actionRef={actionRef}
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
          onChange: (selectedKeys: Key[], selectedRows: BranchTyping.BranchDTO[]) => {
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
    </PageContainer>
  );
};

export default Branch;
