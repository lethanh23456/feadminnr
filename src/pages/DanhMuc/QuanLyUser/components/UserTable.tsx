import type { AdminUser } from '../types';
import { CheckCircleOutlined, LockOutlined, StopOutlined, UnlockOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface UserTableProps {
  loading: boolean;
  dataSource: AdminUser[];
  selectedUserId?: number;
  onSelectUser: (user: AdminUser) => void;
  onBanUser: (user: AdminUser) => void;
  onUnbanUser: (user: AdminUser) => void;
}

const UserTable = ({ loading, dataSource, selectedUserId, onSelectUser, onBanUser, onUnbanUser }: UserTableProps) => {
  const columns: ColumnsType<AdminUser> = [
    { title: 'User ID', dataIndex: 'id', width: 100, fixed: 'left' },
    {
      title: 'Tên user',
      dataIndex: 'username',
      width: 220,
      render: (value?: string) => value || <Typography.Text type='secondary'>Chưa có</Typography.Text>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 260,
      render: (value?: string) => value || <Typography.Text type='secondary'>Chưa có</Typography.Text>,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      width: 160,
      render: (value?: string) => <Tag color='blue'>{value || 'Chưa xác định'}</Tag>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isBanned',
      width: 140,
      render: (isBanned?: boolean) => (
        <Tag color={isBanned ? 'red' : 'green'} icon={isBanned ? <StopOutlined /> : <CheckCircleOutlined />}>
          {isBanned ? 'Đã ban' : 'Hoạt động'}
        </Tag>
      ),
    },
    {
      title: 'Ví',
      dataIndex: 'walletStatus',
      width: 120,
      render: (status?: boolean) => (
        <Tag color={status ? 'green' : 'orange'} icon={status ? <UnlockOutlined /> : <LockOutlined />}>
          {status ? 'Mở' : 'Khóa'}
        </Tag>
      ),
    },
    {
      title: 'Nguồn dữ liệu',
      dataIndex: 'source',
      width: 170,
      render: (source?: string) => <Tag>{source || 'Không rõ'}</Tag>,
    },
    {
      title: 'Thao tác',
      fixed: 'right',
      width: 280,
      render: (_, record) => (
        <Space wrap>
          <Button size='small' type={selectedUserId === record.id ? 'primary' : 'default'} onClick={() => onSelectUser(record)}>
            Chọn user
          </Button>
          <Button size='small' danger onClick={() => onBanUser(record)}>
            Ban
          </Button>
          <Button size='small' onClick={() => onUnbanUser(record)}>
            Unban
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table<AdminUser>
      rowKey='id'
      loading={loading}
      columns={columns}
      dataSource={dataSource}
      pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (total) => `Tổng ${total} user` }}
      scroll={{ x: 1400 }}
    />
  );
};

export default UserTable;
