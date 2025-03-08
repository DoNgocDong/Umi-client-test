import services from '@/services';
import { PageContainer, ProTable, ProColumns } from '@ant-design/pro-components';
import { Button, message, Modal, Table, Tag } from 'antd';
import React, { ReactNode, useEffect, useState } from 'react';

const { getUsers, addUser, updateUser, deleteUser } = services.Users;

const UserList: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => { 
    setLoading(true); 
    try { 
      const response = await getUsers(); 
      setData(response); 
    } catch (error) { 
      message.error('Load users error!'); 
    } 
    setLoading(false); 
  }; 

  const handleDelete = async (id: string) => { 
    Modal.confirm({ 
      title: 'Are you sure?', 
      onOk: async () => { 
        await deleteUser(id); 
        message.success('Deleted!'); 
        loadUsers(); 
      }, 
    }); 
  }; 

  useEffect(() => {
    loadUsers()
  }, []);

  const columns: ProColumns<UserTyping.UserInfo>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '7%',
      fixed: 'left'
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
      render: () => <Tag color="green">Active</Tag>,
    },
    {
      title: 'Option',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      width: '5%',
      render: (_: any, record: any) => (
        <Button type="link" danger onClick={() => handleDelete(record.id)}>
          Xóa
        </Button>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable<UserTyping.UserInfo>
        search={false}
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id"
        pagination={{
          pageSize: 10
        }}
        scroll={{
          x: 'max-content'
        }}
      />
    </PageContainer>
  );
};
export default UserList;
