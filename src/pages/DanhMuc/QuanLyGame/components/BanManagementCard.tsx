import { Button, Card, Form, Input, InputNumber, Popconfirm, Space, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { BanFormValues, BanRecord } from '../types';

interface BanManagementCardProps {
  loading?: boolean;
  data: BanRecord[];
  onBan: (values: BanFormValues) => Promise<void>;
  onUnban: (userId: string) => Promise<void>;
  onReload: () => Promise<void>;
}

const BanManagementCard = ({ loading, data, onBan, onUnban, onReload }: BanManagementCardProps) => {
  const [form] = Form.useForm<BanFormValues>();

  const columns: ColumnsType<BanRecord> = [
    {
      title: 'User ID',
      dataIndex: 'userId',
      width: 90,
    },
    {
      title: 'Auth ID',
      dataIndex: 'authId',
      width: 130,
      render: (value: unknown) => String(value ?? '-'),
    },
    {
      title: 'Username',
      dataIndex: 'username',
      width: 150,
      render: (value: unknown) => <Typography.Text strong>{String(value ?? '-')}</Typography.Text>,
    },
    {
      title: 'Lý do',
      dataIndex: 'why',
      ellipsis: true,
      render: (value: unknown, record) => String(value || record.reason || '-'),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      width: 130,
      render: () => <Tag color='orange'>Tạm khóa</Tag>,
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 140,
      fixed: 'right',
      render: (_, record) => (
        <Popconfirm
          title='Mở khóa tài khoản này?'
          okText='Mở khóa'
          cancelText='Hủy'
          onConfirm={() => onUnban(String(record.userId || ''))}
          disabled={!record.userId}
        >
          <Button size='small' disabled={!record.userId}>
            Mở khóa
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Card
      title='Khóa / Mở khóa tài khoản tạm thời'
      extra={
        <Button onClick={onReload} loading={loading}>
          Làm mới ds ban
        </Button>
      }
      style={{ height: '100%' }}
    >
      <Form form={form} layout='vertical' onFinish={onBan}>
        <Space wrap align='start'>
          <Form.Item
            name='userId'
            label='User ID'
            rules={[{ required: true, message: 'Nhập User ID cần khóa' }]}
          >
            <InputNumber min={1} placeholder='User ID' style={{ width: 140 }} />
          </Form.Item>

          <Form.Item
            name='phut'
            label='Số phút khóa'
            rules={[{ required: true, message: 'Nhập số phút khóa' }]}
            initialValue={30}
          >
            <InputNumber min={1} max={10080} style={{ width: 140 }} />
          </Form.Item>

          <Form.Item
            name='why'
            label='Lý do khóa'
            rules={[{ required: true, message: 'Nhập lý do khóa' }]}
          >
            <Input placeholder='Ví dụ: Vi phạm điều khoản game' style={{ width: 260 }} />
          </Form.Item>

          <Form.Item label=' '>
            <Button type='primary' htmlType='submit' loading={loading}>
              Khóa tạm thời
            </Button>
          </Form.Item>
        </Space>
      </Form>

      <Table
        rowKey={(record, index) => String(record.userId || index)}
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: 6, showSizeChanger: true }}
        scroll={{ x: 900 }}
      />
    </Card>
  );
};

export default BanManagementCard;
