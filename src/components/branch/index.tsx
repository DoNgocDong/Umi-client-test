import services from '@/services';
import React, { Key, ReactNode, useRef, useState, useCallback } from 'react';
import { ProColumns, ProTable, PageContainer, ActionType } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { Button, message, Modal, notification } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, CopyOutlined } from '@ant-design/icons';
import CreateBranch from '@/components/Branch/components/createBranch';
import UpdateBranch from '@/components/Branch/components/updateBranch';
import { RequestError } from '@umijs/max';
import styles from './index.less';
import { PageReqData } from '@/dtos/request';

const { getPagination, create, updateById, deleteByIds } = services.Branch;

const copyClipboard = async (value?: string) => {
  await navigator.clipboard.writeText(value || '');
  message.success('Copied!');
}

const Branch: React.FC = () => {
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [selectedRowKeysState, setSelectedRowKeys] = useState<Key[]>([]);
  const [updateRecord, setUpdateRecord] = useState<BranchTyping.BranchInfo>();
  const actionRef = useRef<ActionType>();

  const fetchBranchData = useCallback(async (params: PageReqData) => {
    setLoading(true);
    const { data } = await getPagination(params);
    setLoading(false);

    return {
      data: data.list_data,
      total: data.total
    }
  }, []);

  const handleCreateBranch = useCallback(async (data: BranchTyping.BranchDTO) => {
    const hide = message.loading('Loading...');
  
    try {
      await create( {...data} );
      hide();
      message.success('Created!');
      return true;
    } catch (error: RequestError | any) {
      const message = error?.response?.data?.error?.message || error?.response?.data || error?.message || 'Unknow Error';
      notification.error({message});
      return false;
    }
  }, []);
  
  const handleUpdateBranch = useCallback(async (data: BranchTyping.BranchInfo) => {
    const hide = message.loading('Loading...');
    const updateData: BranchTyping.BranchDTO = {
      branchName: data.branchName,
      address: data.address,
      description: data.description    
    }
  
    try {
      await updateById(data.branchId, updateData);
      hide();
      message.success('Updated!');
      return true;
    } catch (error: RequestError | any) {
      const message = error?.response?.data?.error?.message || error?.response?.data || error?.message || 'Unknow Error';
      notification.error(message);
      return false;
    }
  }, []);
  
  const handleDeleteBranchIds = useCallback(async (ids: String[]) => {
    const hide = message.loading('Loading...');
  
    try {
      await deleteByIds(ids);
      hide();
      message.success('Deleted!');
      return true;
    } catch (error: RequestError | any) {
      const message = error?.response?.data?.error?.message || error?.response?.data || 'Unknow Error';
      notification.error({message: message || 'Unknown Error!'});
      return false;
    }
  }, []);

  const handleClickEditBtn = (record: BranchTyping.BranchInfo) => {
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
      width: '20ch',
      render: (text) => (
        <span className={styles.ellipsis}>
          <Button icon={<CopyOutlined />} type='link' size='small' onClick={() => copyClipboard(text?.toString())}/>
          {text}
        </span>
      )
    },
    {
      title: 'Name',
      dataIndex: 'branchName',
      key: 'branchName',
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
      title: 'Option',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      width: '5%',
      render: (text: ReactNode, record: BranchTyping.BranchInfo) => (
        <>
          <a 
            style={{ display: 'flex', justifyContent: 'center' }} 
            onClick={() => handleClickEditBtn(record)}
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
        search={false}
        bordered={true}
        rowKey="branchId"
        request={async (params) => {
          const data = await fetchBranchData(params);

          return {
            data: data.data,
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
              onClick={() => {
                Modal.confirm({ 
                  title: 'Are you sure to delete?', 
                  content: `Data is not "completely deleted" but will be "soft deleted"`,
                  onOk: async () => { 
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
                  }, 
                });
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
            setCreateModalVisible(false);
            setLoading(false);

            if (success) {
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
          setUpdateModalVisible(false);

          if (success) {
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