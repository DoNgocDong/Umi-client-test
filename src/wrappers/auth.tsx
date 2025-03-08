import { useAccess, useModel, history, Outlet } from '@umijs/max';
import { message } from 'antd';
import { useEffect } from 'react';

export default () => {
  const access = useAccess(); // Lấy quyền truy cập từ access.ts
  const { initialState } = useModel('@@initialState'); // Lấy user từ initialState

  useEffect(() => {
    if (!initialState?.user && !history.location.pathname.includes('login')) {
      message.error('You are not login');
      history.push('/login');
    }
  }, [initialState?.user]);

  if (!access.admin) {
    return <div>Bạn không có quyền truy cập trang này!</div>;
  }

  return <Outlet></Outlet>; 
}