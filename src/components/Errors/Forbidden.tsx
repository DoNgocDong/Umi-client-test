import { Button, Result } from 'antd';
import { history } from '@umijs/max';
import { ArrowRightOutlined } from '@ant-design/icons';

const Forbidden = (
  <Result
    status="403"
    title="403"
    subTitle="Forbidden"
    extra={
      <Button type="primary" onClick={() => history.push('/login')}>
        Go to Login
        <ArrowRightOutlined />
      </Button>
    }  
  />
);

export default Forbidden;
