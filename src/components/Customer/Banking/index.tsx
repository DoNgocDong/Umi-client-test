import { useEffect, useState } from 'react';
import { Avatar, Card, Descriptions, Typography, Space, message, DescriptionsProps, Badge, Button } from 'antd';
import { BankOutlined, CopyOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import styles from './index.less';
import { ResponseError } from 'umi-request';
import { BankingAccountInfo } from '@/services/account/account';
import dayjs from 'dayjs';
import services from "@/services";
import logoUrl from "@/assets/logo/KLB_logo.svg";

const { getBankingAccount } = services.Account;
const { Title } = Typography;

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<BankingAccountInfo>();
  const [hiddenBalance, setHidden] = useState<boolean>(true);

  const toggleBalance = () => setHidden(!hiddenBalance);

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat('vi-VN').format(balance) + ' đ';
  };

  const copyClipboard = async (value?: string) => {
    await navigator.clipboard.writeText(value || '');
    message.success('Copied!');
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const {data} = await getBankingAccount();
        setProfile(data);
      } catch (error: ResponseError | any) {
        console.error('Lỗi khi lấy thông tin ngân hàng:', error);
        message.error(error?.response?.data?.error?.message || error?.response?.data || error?.message)
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Tên chủ tài khoản',
      children: (
        <Typography.Text
          style={{
            fontWeight: 'bold',
            letterSpacing: 1,
            transition: 'filter 0.3s'
          }}
        >
          {profile.nickName}
        </Typography.Text>
      ),
    },
    {
      key: '2',
      label: 'Số tài khoản',
      span: 'filled',
      children: (
        <span>
          <Typography.Text
            style={{
              fontWeight: 'bold',
              letterSpacing: 1,
              transition: 'filter 0.3s'
            }}
          >
            {profile.accountCommon.accountNumber}
          </Typography.Text>
          <Button icon={<CopyOutlined />} type='link' size='small' onClick={() => copyClipboard(profile.accountCommon.accountNumber.toString())}/>
        </span>
      ),
    },
    {
      key: '3',
      label: 'Số dư',
      span: 3,
      children: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography.Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              letterSpacing: 1,
              filter: hiddenBalance ? 'blur(4px)' : 'none', // Làm mờ số dư
              transition: 'filter 0.3s',
            }}
          >
            {hiddenBalance ? '••••••••' : formatBalance(profile.balance)}
          </Typography.Text>
          <Button
            type="text"
            icon={hiddenBalance ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            onClick={toggleBalance}
            style={{ marginLeft: 10 }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className={styles.profileContainer}>
      <Card className={styles.profileCard}>
        {/* Avatar + Họ Tên */}
        <Space direction="vertical" align="center" style={{ width: '100%' }}>
          <Avatar size={100} src={logoUrl} icon={<BankOutlined />} />
          <Title level={3}>NGÂN HÀNG TMCP KIÊN LONG</Title>
        </Space>

        {/* Thông tin chi tiết */}
        <Descriptions layout="vertical" bordered items={items} style={{ marginTop: 20 }}/>
      </Card>
    </div>
  );
};

export default ProfilePage;
