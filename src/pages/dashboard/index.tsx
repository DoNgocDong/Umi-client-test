import { Bar } from '@ant-design/charts';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Col, Row, Statistic } from 'antd';
import { FC } from 'react';

const dashboard: FC = () => {
  const data = [
    { category: 'Q1', value: 30 },
    { category: 'Q2', value: 80 },
    { category: 'Q3', value: 45 },
    { category: 'Q4', value: 60 },
  ];
  return (
    <PageContainer>
      <Row gutter={24} style={{ marginBottom: 10 }}>
        <Col span={8}>
          <Card>
            <Statistic title="Người dùng mới" value={1000} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Doanh thu 2024" value={12345} prefix="$" />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Row gutter={24}>
              <Col span={12}>
                <Statistic
                  title="Tăng trưởng cùng kỳ"
                  value={4.21}
                  precision={2}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<ArrowDownOutlined />}
                  suffix="%"
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Tổng tăng trưởng"
                  value={60.91}
                  precision={2}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Card title="Thống kê doanh số">
        <Bar data={data} xField="category" yField="value" />
      </Card>
    </PageContainer>
  );
};

export default dashboard;
