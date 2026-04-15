import { Descriptions, Drawer, Tag, Typography } from 'antd';
import dayjs from '@/utils/dayjs';
import type { AccountItem } from '../types';

interface AccountDetailDrawerProps {
  open: boolean;
  account?: AccountItem;
  onClose: () => void;
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

const AccountDetailDrawer = ({ open, account, onClose }: AccountDetailDrawerProps) => {
  return (
    <Drawer open={open} title='Chi tiết account' width={560} onClose={onClose}>
      {!account ? null : (
        <Descriptions column={1} bordered size='small'>
          <Descriptions.Item label='ID'>{account.id}</Descriptions.Item>
          <Descriptions.Item label='Tên account'>
            <Typography.Text strong>{account.username || '-'}</Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label='Giá bán'>
            {Number(account.price || 0).toLocaleString('vi-VN')} VNĐ
          </Descriptions.Item>
          <Descriptions.Item label='Trạng thái'>
            <Tag color={getStatusColor(account.status)}>{account.status || 'selling'}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label='Link account'>
            {account.url ? (
              <Typography.Link href={String(account.url)} target='_blank'>
                {String(account.url)}
              </Typography.Link>
            ) : (
              '-'
            )}
          </Descriptions.Item>
          <Descriptions.Item label='Mô tả'>{account.description || '-'}</Descriptions.Item>
          <Descriptions.Item label='Seller ID'>{String(account.sellerId || account.partnerId || '-')}</Descriptions.Item>
          <Descriptions.Item label='Buyer ID'>{String(account.buyerId || '-')}</Descriptions.Item>
          <Descriptions.Item label='Ngày tạo'>{formatDate(account.createdAt as string | undefined)}</Descriptions.Item>
          <Descriptions.Item label='Ngày cập nhật'>{formatDate(account.updatedAt as string | undefined)}</Descriptions.Item>
          <Descriptions.Item label='Ngày bán'>{formatDate(account.soldAt as string | undefined)}</Descriptions.Item>
        </Descriptions>
      )}
    </Drawer>
  );
};

export default AccountDetailDrawer;
