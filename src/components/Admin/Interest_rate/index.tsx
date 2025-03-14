import services from "@/services";
import { FC, useState, useRef, ReactNode, Key, useCallback } from "react";
import { ProColumns, ProTable, PageContainer, ActionType } from '@ant-design/pro-components';
import dayjs from "dayjs";
import { CopyOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Badge, Button, message, Modal, notification, Tag } from "antd";
import styles from './index.less';
import { RequestError } from "@umijs/max";
import { InterestRateDTO, InterestRateInfo, Group, Unit } from '@/services/interest_rate/typing';
import CreateRateForm from "./components/createRate";

const { getPagination, create, updateById, deleteByIds } = services.InterestRate;

const copyClipboard = async (value?: string) => {
  await navigator.clipboard.writeText(value || '');
  message.success('Copied!');
}

const InterestRate: FC = () => {
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [selectedRowKeysState, setSelectedRowKeys] = useState<Key[]>([]);
  const actionRef = useRef<ActionType>();

  const handleCreateRate = useCallback(async (data: InterestRateDTO) => {
    const hide = message.loading('Loading...');
  
    try {
      await create( {...data} );
      hide();
      message.success('Created!');
      return true;
    } catch (error: RequestError | any) {
      const message = error?.response?.data?.error?.message || error?.response?.data || error?.message;
      notification.error(message);
      return false;
    }
  }, []);

  const handleDeleteIds = useCallback(async (ids: String[]) => {
    const hide = message.loading('Loading...');
  
    try {
      await deleteByIds(ids);
      hide();
      message.success('Deleted!');
      return true;
    } catch (error: RequestError | any) {
      const message = error?.response?.data?.error?.message || error?.response?.data || error?.message;
      notification.error(message || 'Unknown Error!');
      return false;
    }
  }, []);

  const columns: ProColumns<InterestRateInfo>[] = [
    {
      title: 'ID',
      dataIndex: 'interestRateId',
      hideInForm: true,
      key: 'interestRateId',
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
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate',
      width: '10%',
      render: (text: ReactNode, record: InterestRateInfo) => {
        return `${text}% / ${record.unit}`
      }
      // render: (text: ReactNode, record: InterestRateTyping.InterestRateInfo) => (
      //   <Tag bordered={false} color="processing"> {text}% / {record.unit} </Tag>
      // )
    },
    {
      title: 'Group',
      dataIndex: 'interestGroup',
      key: 'interestGroup',
      width: '10%',
      align: 'center',
      valueEnum: (row: InterestRateInfo) => ({
        [Group.SAVING]: <Tag color='processing'> {row.interestGroup} </Tag>,
        [Group.CREDIT]: <Tag color='magenta'> {row.interestGroup} </Tag>,
      })
    },
    {
      title: 'Savings Term (MONTH)',
      dataIndex: 'minimumTerm',
      key: 'term',
      align: 'center',
      render: (text: ReactNode, record: InterestRateInfo) => {
        const minTerm = record.minimumTerm;
        const maxTerm = record.maximumTerm;

        if(!minTerm && !maxTerm) {
          return (
            <Tag color="warning">
              Not Available
            </Tag>
          );
        }

        if(maxTerm == -1) {
          return `> ${minTerm}`
        }

        return `${minTerm} - ${maxTerm}`
      }
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      hideInForm: true,
      key: 'createdAt',
      align: 'center',
      render: (text) => {
        return dayjs(text?.toLocaleString()).format('DD-MM-YYYY');
      },
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      width: '5%',
      fixed: 'right',
      align: 'center',
      render: (text: ReactNode, record: InterestRateInfo) => {
        const isActive = record.isActive;
        
        return (
          <Badge 
            status={isActive ? 'success' : 'default'} 
            text={isActive ? 'active': 'stop'} 
          />
        )
      }
    },
  ]

  return (
    <PageContainer>
      <ProTable<InterestRateInfo>
        columns={columns}
        loading={loading}
        actionRef={actionRef}
        search={false}
        bordered={true}
        rowKey="interestRateId"
        request={async (params, sorter, filter) => {
          setLoading(true);
          const { data } = await getPagination(params);
          setLoading(false);

          return {
            data: data.list_data,
            total: data.total,
            success: true,
          };
        }}
        toolBarRender={() => [
          <Button
            icon={<PlusOutlined />}
            type="primary"
            color="cyan"
            variant="solid"
            onClick={() => {
              setCreateModalVisible(true);
            }}
          >
            Thêm mới
          </Button>,
        ]}
        pagination={{
          pageSize: 10,
        }}
        rowSelection={{
          selectedRowKeys: selectedRowKeysState,
          onChange: (selectedKeys: Key[], selectedRows: InterestRateInfo[]) => {
            setSelectedRowKeys(selectedKeys);
          },
        }}
        tableAlertOptionRender={() => {
          return (
            <Button
              icon={<DeleteOutlined />}
              color="danger"
              variant="dashed"
              onClick={() => {
                Modal.confirm({
                  title: 'Are you sure to delete?',
                  content: `Data is not "completely deleted" but will be "soft deleted"`,
                  onOk: async () => {
                    setLoading(true);

                    const deleted = await handleDeleteIds(
                      selectedRowKeysState.map((key) => String(key)),
                    );

                    if (deleted) {
                      setSelectedRowKeys([]);
                      if (actionRef.current) {
                        await actionRef.current.reload();
                      }
                    }

                    setLoading(false);
                  },
                });
              }}
            >
              Xóa
            </Button>
          );
        }}
        scroll={{
          x: 'max-content',
        }}
      />

      <CreateRateForm
        visible={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onSubmit={async (data: InterestRateDTO) => {
          setLoading(true);
          const success = await handleCreateRate(data);
          setLoading(false);

          if (success) {
            setCreateModalVisible(false);
            if (actionRef.current) {
              await actionRef.current.reload();
            }
          }
        }}
      >
      </CreateRateForm>
    </PageContainer>
  );
}

export default InterestRate;