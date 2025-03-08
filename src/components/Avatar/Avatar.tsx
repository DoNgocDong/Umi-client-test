import { LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useModel, history } from '@umijs/max';
import { Avatar, Dropdown, MenuProps, Modal } from 'antd';
import { FC } from 'react';

const menuItems: MenuProps['items'] = [
  {
    key: 'logout',
    icon: <LogoutOutlined />,
    label: 'Logout',
    onClick: () => {
      Modal.confirm({ 
        title: 'Are you sure to Log out?', 
        onOk: () => { 
          localStorage.removeItem('user');
          history.push('/login');
          window.location.reload();
        }, 
      });
    }
  }
]

const AvatarContent: FC = () => {
  const { initialState } = useModel('@@initialState');

  // Nếu user đã đăng nhập, hiển thị Avatar + Logout
  if (initialState?.user) {
    return (
      <Dropdown menu={{ items: menuItems }}>
        <Avatar 
          style={{ backgroundColor: '#87d068', marginRight: 20 }} 
          icon={<UserOutlined />} 
        />
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
