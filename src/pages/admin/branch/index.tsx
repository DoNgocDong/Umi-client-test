import { lazy, Suspense, FC } from "react";
import { Spin } from "antd";

const BranchComponent = lazy( () => import('@/components/Admin/Branch') );

const BranchPage: FC = () => {
  return(
    <Suspense fallback={ <Spin size="large" /> }>
      <BranchComponent />
    </Suspense>
  );
}

export default BranchPage;