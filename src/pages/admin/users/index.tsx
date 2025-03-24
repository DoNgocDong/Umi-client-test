import { lazy, Suspense, FC } from "react";
import { Spin } from "antd";

const UserComponent = lazy( () => import('@/components/Admin/User') );

const UserPage: FC = () => {
  return(
    <Suspense fallback={ <Spin size="large" /> }>
      <UserComponent />
    </Suspense>
  );
}

export default UserPage;