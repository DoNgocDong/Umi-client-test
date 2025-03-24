import { useEffect, useState } from 'react';
import { Avatar, Card, Descriptions, Typography, Space, message, DescriptionsProps, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './index.less';
import { ResponseError } from 'umi-request';
import { AccountInfo } from '@/services/account/account';
import dayjs from 'dayjs';
import services from "@/services";

const { getProfile } = services.Account;

const { Title } = Typography;

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<AccountInfo>();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const {result: data} = await getProfile();
        setProfile(data);
      } catch (error: ResponseError | any) {
        console.error('Lỗi khi lấy thông tin cá nhân:', error);
        message.error(error?.response?.data?.error?.message || error?.response?.data || error?.message)
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'ID',
      children: profile.id,
      span: 3,
      style: { textAlign: 'center' }
    },
    {
      key: '2',
      label: 'CMND/CCCD',
      children: profile.identityCard,
    },
    {
      key: '3',
      label: 'Giới tính',
      children: profile.gender,
    },
    {
      key: '4',
      label: 'Ngày sinh',
      children: dayjs(profile.dob.toLocaleString()).format('DD-MM-YYYY'),
    },
    {
      key: '5',
      label: 'SĐT',
      children: profile.phone,
    },
    {
      key: '6',
      label: 'Email',
      children: profile.mail,
    },
    {
      key: '7',
      label: 'Địa chỉ',
      children: profile.address,
    },
    {
      key: '8',
      label: 'Trạng thái',
      span: 3,
      children: <Badge status={profile.status === 'ACTIVE' ? 'success' : 'error'} text={profile.status} />,
    }
  ];

  return (
    <div className={styles.profileContainer}>
      <Card className={styles.profileCard}>
        {/* Avatar + Họ Tên */}
        <Space direction="vertical" align="center" style={{ width: '100%' }}>
          <Avatar size={100} src={profile.avatar} icon={<UserOutlined />} />
          <Title level={3}>{profile.firstName} {profile.lastName}</Title>
        </Space>

        {/* Thông tin chi tiết */}
        <Descriptions layout="vertical" bordered items={items} style={{ marginTop: 20, alignItems: 'center' }}/>
      </Card>
    </div>
  );
};

export default ProfilePage;
