import { LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useModel, history } from '@umijs/max';
import { Avatar, Dropdown, MenuProps, Modal, Space, Typography } from 'antd';
import { FC } from 'react';
import { logout } from "@/services/auth/authService";

const AvatarContent: FC = () => {
  const { initialState } = useModel('@@initialState');

  const handleLogout = async () => {
    const refreshToken = initialState?.refreshToken;
  
    if((refreshToken == null) || (refreshToken == 'undefined')) {
      localStorage.clear();
      history.push('/login');
      window.location.reload();
      return;
    }
    
    await logout(refreshToken)
  
    localStorage.clear();
    history.push('/login');
    window.location.reload();
  }

  const menuItems: MenuProps['items'] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: () => {
        Modal.confirm({ 
          title: 'Are you sure to Log out?', 
          onOk: handleLogout, 
        });
      }
    }
  ]

  // Nếu user đã đăng nhập, hiển thị Avatar + Logout
  if (initialState?.token) {
    const username = initialState?.payload?.username || initialState?.payload?.name
    return (
      <Dropdown menu={{ items: menuItems }}>
        <Space size={'large'} style={{ cursor: 'pointer', marginRight: 20 }}>
          <Typography.Text>{username || 'Guest'}</Typography.Text>
          <Avatar
            style={{ backgroundColor: '#87d068' }}
            icon={<UserOutlined />}
          />
        </Space>

      </Dropdown>
    );
  }

  // Nếu chưa đăng nhập, hiển thị nút Login
  return (
    <a onClick={() => history.push('/login')} style={{ marginRight: 20 }}>
      <LoginOutlined /> Login
    </a>
  );
};

export default AvatarContent;
