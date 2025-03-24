import { BankOutlined, LoginOutlined, LogoutOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import { useModel, history, useAccess } from '@umijs/max';
import { Avatar, Dropdown, MenuProps, Modal, Space, Typography } from 'antd';
import { FC } from 'react';
import { logout } from "@/services/auth/authService";

const AvatarContent: FC = () => {
  const { initialState } = useModel('@@initialState');
  const access = useAccess();

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

  if(access.customer) {
    menuItems.unshift(
      {
        key: 'profile',
        icon: <ProfileOutlined />,
        label: 'Profile',
        onClick: () => history.push('/profile'),
      },
      {
        key: 'banking',
        icon: <BankOutlined />,
        label: 'Banking account',
        onClick: () => history.push('/banking'),
      },
      { 
        type: 'divider' 
      },
    )
  }

  // Nếu user đã đăng nhập, hiển thị Avatar + Logout
  if (initialState?.token) {
    const username = initialState?.payload?.username || initialState?.payload?.name
    return (
      <Dropdown menu={{ items: menuItems }}>
        <Space size={'large'} style={{ cursor: 'pointer' }}>
          <Typography.Text>{username || 'Unknow'}</Typography.Text>
          <Avatar
            style={{ backgroundColor: '#f59056' }}
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
