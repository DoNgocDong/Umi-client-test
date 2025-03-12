import { lazy, Suspense, FC } from "react";
import { Spin } from "antd";

const InterestRateComponent = lazy( () => import('@/components/Interest_rate') );

const BranchPage: FC = () => {
  return(
    <Suspense fallback={ <Spin size="large" /> }>
      <InterestRateComponent />
    </Suspense>
  );
}

export default BranchPage;