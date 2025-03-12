import { UserState } from '@/models/user';
import { PageContainer, ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import { AnyAction, connect, Dispatch, RequestError } from '@umijs/max';
import { Button, Divider, message, Modal, notification, Table, Tag } from 'antd';
import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import CreateUser from './components/createUser';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import UpdateUser from './components/updateUser';

interface UserListProps {
  user: UserState;
  dispatch: (args: any) => Promise<Dispatch<AnyAction>>;
}

const UserList: React.FC<UserListProps> = ({ user, dispatch }) => {
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [updateRecord, setUpdateRecord] = useState<UserTyping.UserInfo>();
  const actionRef = useRef<ActionType>();

  const handleCreate = useCallback(async (data: UserTyping.UserDTO) => {
    try {
      await dispatch({ type: 'user/addUser', payload: data });
      message.success('Created!');
      return true;
    } catch (error: RequestError | any) {
      const message = error?.response?.data?.error?.message || error?.response?.data || error?.message;
      notification.error(message || 'Unknown Error!');
      return false;
    }
  }, [])

  const handleUpdateUser = useCallback(async (data: UserTyping.UserInfo) => {
    const body: UserTyping.UserDTO = {
      name: data.name,
      email: data.email,
      website: data.website
    }

    try {
      await dispatch({ 
        type: 'user/updateUser', 
        payload: {
          id: data.id,
          body
        } 
      });

      message.success('Updated!');
      return true;
    } catch (error: RequestError | any) {
      const message = error?.response?.data?.error?.message || error?.response?.data || error?.message;
      notification.error(message || 'Unknown Error!');
      return false;
    }
  }, []);

  const handleDelete = useCallback(async (id: string) => { 
    Modal.confirm({ 
      title: 'Are you sure to Delete?', 
      onOk: async () => { 
        await dispatch({ type: 'user/deleteUser', payload: id }); 
        message.success('Deleted!'); 
      }, 
    }); 
  }, []); 

  const handleClickEditBtn = (record: UserTyping.UserInfo) => {
    setUpdateRecord(record)
    setUpdateModalVisible(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      await dispatch({ type: 'user/fetchUsers' });
      setLoading(false); 
    }

    fetchData();
  }, [dispatch]);

  const columns: ProColumns<UserTyping.UserInfo>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '7%',
      fixed: 'left',
      hideInForm: true,
    },
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
      render: (text: ReactNode) => (
        <a href={`http://${text}`} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      hideInForm: true,
      render: () => <Tag color="green">Active</Tag>,
    },
    {
      title: 'Option',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      width: '5%',
      render: (_: any, record: any) => (
        <>
          <a
            onClick={() => handleClickEditBtn(record)}
          >
            <EditOutlined />
          </a>

          <Divider type="vertical" />

          <a 
            style={{ color: 'red' }}
            onClick={() => handleDelete(record.id)}
          >
            <DeleteOutlined />
          </a>
        </>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable<UserTyping.UserInfo>
        search={false}
        columns={columns}
        dataSource={user.list}
        loading={loading}
        rowKey="id"
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
          pageSize: 10,
        }}
        scroll={{
          x: 'max-content',
        }}
      />

      {/*
        Create User Modal 
      */}
      <CreateUser
        onCancel={() => setCreateModalVisible(false)}
        visible={createModalVisible}
      >
        <ProTable<UserTyping.UserInfo, UserTyping.UserDTO>
          onSubmit={async (value) => {
            setLoading(true);
            const success = await handleCreate(value);

            if (success) {
              setCreateModalVisible(false);
              if (actionRef.current) {
                await actionRef.current.reload();
              }
            }

            setLoading(false);
          }}
          rowKey="id"
          type="form"
          columns={columns}
        />
      </CreateUser>

      {/*
        Update User Modal 
      */}
      <UpdateUser
        visible={updateModalVisible} 
        onCancel={() => setUpdateModalVisible(false)} 
        data={updateRecord} 
        onUpdate={async (data: UserTyping.UserInfo) => {
          setLoading(true);
          const success = await handleUpdateUser(data);
          setLoading(false);

          if (success) {
            setUpdateModalVisible(false);
            if (actionRef.current) {
              await actionRef.current.reload();
            }
          }
        }}>
      </UpdateUser>
    </PageContainer>
  );
};
export default connect(
  ( {user}: {user: UserState} ) => (
    {user}
  )
)(UserList);
