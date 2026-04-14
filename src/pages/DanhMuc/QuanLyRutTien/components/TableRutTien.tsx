import React from 'react';
import { Table, Tag, Button, Popconfirm, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EWithdrawStatus, WithdrawStatusConfig } from '@/services/Cashier/constant';

interface IRecord {
  id: number;
  user_id: number;
  amount: number;
  bank_name: string;
  bank_number: string;
  bank_owner: string;
  status: EWithdrawStatus;
  finance_id: number;
}

interface TableRutTienProps {
  dataSource: IRecord[];
  loading: boolean;
  onApprove: (record: IRecord) => void;
  onReject: (record: IRecord) => void;
}

const TableRutTien: React.FC<TableRutTienProps> = ({ dataSource, loading, onApprove, onReject }) => {
  const columns: ColumnsType<IRecord> = [
    {
      title: 'Mã',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      align: 'center',
    },
    {
      title: 'Mã số ND',
      dataIndex: 'user_id',
      key: 'user_id',
      width: 100,
      align: 'center',
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => (
        <span style={{ fontWeight: 600, color: '#1677ff' }}>
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)}
        </span>
      ),
    },
    {
      title: 'Thông tin Ngân hàng',
      key: 'bank_info',
      render: (_, record) => (
        <div>
          <div><strong>Ngân hàng:</strong> {record.bank_name}</div>
          <div><strong>STK:</strong> {record.bank_number}</div>
          <div><strong>Chủ TK:</strong> {record.bank_owner}</div>
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status: EWithdrawStatus) => {
        const config = WithdrawStatusConfig[status as string] || { color: 'default', text: status };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      align: 'center',
      render: (_, record) => {
        if (record.status === EWithdrawStatus.PENDING) {
          return (
            <Space>
              <Popconfirm
                title="Xác nhận duyệt"
                description="Bạn có chắc chắn muốn duyệt yêu cầu rút tiền này?"
                onConfirm={() => onApprove(record)}
                okText="Đồng ý"
                cancelText="Hủy"
              >
                <Button type="primary" size="small" style={{ backgroundColor: '#52c41a' }}>
                  Duyệt
                </Button>
              </Popconfirm>

              <Popconfirm
                title="Xác nhận từ chối"
                description="Bạn có chắc chắn muốn từ chối yêu cầu rút tiền này?"
                onConfirm={() => onReject(record)}
                okText="Đồng ý"
                cancelText="Hủy"
                okButtonProps={{ danger: true }}
              >
                <Button danger size="small">
                  Từ chối
                </Button>
              </Popconfirm>
            </Space>
          );
        }
        return null;
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      rowKey="id"
      bordered
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100'],
      }}
    />
  );
};

export default TableRutTien;
