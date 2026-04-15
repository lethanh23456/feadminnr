import { Button, Popconfirm, Space, Table, Tag, Tooltip, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from '@/utils/dayjs';
import type { AccountItem } from '../types';

interface AccountTableProps {
  data: AccountItem[];
  loading?: boolean;
  allowEdit?: boolean;
  allowDelete?: boolean;
  allowBuy?: boolean;
  allowMarkSold?: boolean;
  onViewDetail: (record: AccountItem) => void;
  onEdit?: (record: AccountItem) => void;
  onDelete?: (record: AccountItem) => void;
  onBuy?: (record: AccountItem) => void;
  onMarkSold?: (record: AccountItem) => void;
}

const getStatusColor = (status?: string) => {
  if (status === 'sold') return 'green';
  if (status === 'pending') return 'gold';
  return 'blue';
};

const formatDate = (value?: string) => {
  if (!value) return '-';
  return dayjs(value).isValid() ? dayjs(value).format('DD/MM/YYYY HH:mm') : value;
};

const AccountTable = ({
  data,
  loading,
  allowEdit,
  allowDelete,
  allowBuy,
  allowMarkSold,
  onViewDetail,
  onEdit,
  onDelete,
  onBuy,
  onMarkSold,
}: AccountTableProps) => {
  const columns: ColumnsType<AccountItem> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 72,
      fixed: 'left',
    },
    {
      title: 'Tài khoản',
      dataIndex: 'username',
      width: 180,
      fixed: 'left',
      render: (value: string) => <Typography.Text strong>{value || '-'}</Typography.Text>,
    },
    {
      title: 'Giá bán',
      dataIndex: 'price',
      width: 140,
      render: (value: number) => `${Number(value || 0).toLocaleString('vi-VN')} VNĐ`,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: 120,
      render: (status: string) => <Tag color={getStatusColor(status)}>{status || 'selling'}</Tag>,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      ellipsis: true,
      render: (value: string) => (
        <Tooltip title={value || '-'}>
          <span>{value || '-'}</span>
        </Tooltip>
      ),
    },
    {
      title: 'Link',
      dataIndex: 'url',
      width: 180,
      render: (value: string) =>
        value ? (
          <Typography.Link href={value} target='_blank'>
            Mở liên kết
          </Typography.Link>
        ) : (
          '-'
        ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      width: 160,
      render: (value: string) => formatDate(value),
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 280,
      fixed: 'right',
      render: (_, record) => (
        <Space wrap>
          <Button size='small' onClick={() => onViewDetail(record)}>
            Chi tiết
          </Button>

          {allowEdit && onEdit && (
            <Button size='small' onClick={() => onEdit(record)}>
              Cập nhật
            </Button>
          )}

          {allowMarkSold && onMarkSold && record.status !== 'sold' && (
            <Button size='small' type='primary' ghost onClick={() => onMarkSold(record)}>
              Đánh dấu đã bán
            </Button>
          )}

          {allowBuy && onBuy && record.status !== 'sold' && (
            <Button size='small' type='primary' onClick={() => onBuy(record)}>
              Mua account
            </Button>
          )}

          {allowDelete && onDelete && (
            <Popconfirm
              title='Bạn có chắc muốn xóa account này?'
              okText='Xóa'
              cancelText='Hủy'
              onConfirm={() => onDelete(record)}
            >
              <Button danger size='small'>
                Xóa
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey='id'
      bordered
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{ pageSize: 10, showSizeChanger: true }}
      scroll={{ x: 1280 }}
    />
  );
};

export default AccountTable;
