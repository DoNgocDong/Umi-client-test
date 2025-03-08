import { lazy, Suspense, FC } from "react";
import { Spin } from "antd";

const InterestRateComponent = lazy( () => import('@/components/interest_rate') );

const BranchPage: FC = () => {
  return(
    <Suspense fallback={ <Spin size="large" /> }>
      <InterestRateComponent />
    </Suspense>
  );
}

export default BranchPage;