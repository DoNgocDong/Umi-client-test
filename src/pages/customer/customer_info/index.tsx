import { lazy, Suspense, FC } from "react";
import { Spin } from "antd";

const ProfilePage = lazy( () => import('@/components/Customer/Profile') );

const UserPage: FC = () => {
  return(
    <Suspense fallback={ <Spin size="large" /> }>
      <ProfilePage />
    </Suspense>
  );
}

export default UserPage;