import React, { Key, ReactNode, useRef, useState, useCallback, useEffect } from 'react';
import { ProColumns, ProTable, PageContainer, ActionType } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { Button, message, Modal, notification } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, CopyOutlined } from '@ant-design/icons';
import CreateBranch from '@/components/Admin/Branch/components/createBranch';
import UpdateBranch from '@/components/Admin/Branch/components/updateBranch';
import { AnyAction, connect, Dispatch, RequestError } from '@umijs/max';
import styles from './index.less';
import { PageReqData } from '@/dtos/request';
import { BranchState } from '@/models/branch';

interface BranchListProps {
  branch: BranchState;
  dispatch: (args: any) => Promise<Dispatch<AnyAction>>;
}

const copyClipboard = async (value?: string) => {
  await navigator.clipboard.writeText(value || '');
  message.success('Copied!');
}

const Branch: React.FC<BranchListProps> = ({ branch, dispatch }) => {
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [selectedRowKeysState, setSelectedRowKeys] = useState<Key[]>([]);
  const [updateRecord, setUpdateRecord] = useState<BranchTyping.BranchInfo>();
  const [pagination, setPagination] = useState<PageReqData>({
    current: 1,
    pageSize: 10,
  });
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<BranchTyping.BranchInfo>[] = [
    {
      title: 'ID',
      dataIndex: 'branchId',
      hideInForm: true,
      key: 'branchId',
      fixed: 'left',
      width: '20ch',
      render: (text) => (
        <span className={styles.ellipsis}>
          <Button icon={<CopyOutlined />} type='link' size='small' onClick={() => copyClipboard(text?.toString())}/>
          {text}
        </span>
      )
    },
    {
      title: 'Name',
      dataIndex: 'branchName',
      key: 'branchName',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'Branch name is required!',
          },
        ],
      },
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'Address is required!',
          },
        ],
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      hideInForm: true,
      key: 'createdAt',
      render: (text) => {
        // Dùng dayjs để format lại giá trị
        return dayjs(text?.toLocaleString()).format('DD-MM-YYYY');
      },
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      await dispatch({ type: 'branch/fetchBranchs', payload: pagination });
      setLoading(false); 
    }

    fetchData();
  }, [dispatch, pagination]);

  return (
    <PageContainer>
      <ProTable<BranchTyping.BranchInfo>
        columns={columns}
        loading={loading}
        actionRef={actionRef}
        search={false}
        bordered={true}
        dataSource={branch.list}
        rowKey="branchId"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: branch.total,
          onChange: async (current: number, pageSize: number) => {
            setPagination({ current, pageSize });

            setLoading(true); 
            await dispatch({ type: 'branch/fetchBranchs', payload: {current, pageSize} });
            setLoading(false);
          }
        }}
        scroll={{
          x: 'max-content'
        }}
      />
    </PageContainer>
  );
};

export default connect(
  ( {branch}: {branch: BranchState} ) => (
    {branch}
  )
)(Branch);