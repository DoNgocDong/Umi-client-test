import { useModel, history, Outlet } from '@umijs/max';
import { message } from 'antd';
import { useEffect } from 'react';

export default () => {
  const { initialState } = useModel('@@initialState'); // Lấy user từ initialState

  useEffect(() => {
    if (!initialState?.token && !history.location.pathname.includes('login')) {
      message.error('You are not login');
      history.push('/login');
    }
  }, [initialState?.token]);

  return <Outlet></Outlet>; 
}