import { lazy, Suspense, FC } from "react";
import { Spin } from "antd";

const BankingProfilePage = lazy( () => import('@/components/Customer/Banking') );

const UserPage: FC = () => {
  return(
    <Suspense fallback={ <Spin size="large" /> }>
      <BankingProfilePage />
    </Suspense>
  );
}

export default UserPage;