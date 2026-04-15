import {
  addItem,
  addItemWeb,
  banUser,
  changeUserRole,
  createDeTu,
  getAccountSellByPartner,
  getAllAccountBuyer,
  unbanUser,
  updateUserBalance,
  updateUserMoney,
  updateUserWalletStatus,
} from '@/services/Admin/api';
import { Alert, Card, InputNumber, message, Space, Typography } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import UserActionPanel from './components/UserActionPanel';
import UserTable from './components/UserTable';
import UserToolbar from './components/UserToolbar';
import type { AdminUser } from './types';
import './style.less';

const getToken = () => localStorage.getItem('token') || localStorage.getItem('access_token') || '';

const getArrayFromResponse = (raw: any): any[] => {
  const source = raw?.data?.data ?? raw?.data?.users ?? raw?.data ?? raw?.users ?? raw;
  return Array.isArray(source) ? source : [];
};

const toBoolean = (value: unknown): boolean | undefined => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value > 0;
  if (typeof value === 'string') {
    if (['true', '1', 'active', 'open', 'enabled'].includes(value.toLowerCase())) return true;
    if (['false', '0', 'inactive', 'closed', 'disabled'].includes(value.toLowerCase())) return false;
  }
  return undefined;
};

const normalizeUser = (raw: any, source: string): AdminUser | null => {
  const id = Number(raw?.id ?? raw?.userId ?? raw?.uid ?? raw?.player_id);
  if (!id || Number.isNaN(id)) return null;

  const statusText = String(raw?.status ?? '').toUpperCase();
  const isBannedRaw = raw?.is_ban ?? raw?.isBanned ?? raw?.banned;
  const walletStatusRaw = raw?.wallet_status ?? raw?.walletStatus ?? raw?.status_wallet;

  return {
    id,
    username: raw?.username ?? raw?.name ?? raw?.account_name ?? raw?.player_name,
    email: raw?.email,
    role: raw?.role ?? raw?.user_role,
    isBanned: toBoolean(isBannedRaw) ?? statusText === 'BANNED',
    walletStatus: toBoolean(walletStatusRaw),
    source,
    raw,
  };
};

const QuanLyUser = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [keywordInput, setKeywordInput] = useState('');
  const [keywordFilter, setKeywordFilter] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number>();

  const fetchUsers = async () => {
    const token = getToken();
    if (!token) {
      message.warning('Không tìm thấy token đăng nhập');
      return;
    }

    setLoading(true);
    try {
      const [buyerRes, partnerRes] = await Promise.allSettled([getAllAccountBuyer(token), getAccountSellByPartner(token)]);

      const buyerRows = buyerRes.status === 'fulfilled' ? getArrayFromResponse(buyerRes.value).map((item) => normalizeUser(item, 'AllAccountBuyer')) : [];
      const partnerRows =
        partnerRes.status === 'fulfilled' ? getArrayFromResponse(partnerRes.value).map((item) => normalizeUser(item, 'AccountSellByPartner')) : [];

      const merged = [...buyerRows, ...partnerRows].filter(Boolean) as AdminUser[];
      const uniqueMap = new Map<number, AdminUser>();

      merged.forEach((user) => {
        if (!uniqueMap.has(user.id)) {
          uniqueMap.set(user.id, user);
          return;
        }
        const oldValue = uniqueMap.get(user.id)!;
        uniqueMap.set(user.id, {
          ...oldValue,
          ...user,
          source: `${oldValue.source || ''}, ${user.source || ''}`.replace(/^, |, $/g, ''),
        });
      });

      const finalUsers = Array.from(uniqueMap.values()).sort((a, b) => b.id - a.id);
      setUsers(finalUsers);
    } catch {
      message.error('Không thể tải danh sách user');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const keyword = keywordFilter.trim().toLowerCase();
    if (!keyword) return users;

    return users.filter((user) => {
      return (
        String(user.id).includes(keyword) ||
        user.username?.toLowerCase().includes(keyword) ||
        user.email?.toLowerCase().includes(keyword)
      );
    });
  }, [keywordFilter, users]);

  const ensureUserId = (): number | null => {
    if (selectedUserId) return selectedUserId;
    message.warning('Vui lòng chọn user trước khi thao tác');
    return null;
  };

  const withAction = async (action: () => Promise<unknown>, successText: string) => {
    setActionLoading(true);
    try {
      await action();
      message.success(successText);
      await fetchUsers();
    } catch {
      message.error('Thao tác thất bại, vui lòng kiểm tra lại dữ liệu đầu vào');
    } finally {
      setActionLoading(false);
    }
  };

  const handleBan = async (userId: number) => {
    const token = getToken();
    await withAction(async () => banUser(token, userId), 'Ban user thành công');
  };

  const handleUnban = async (userId: number) => {
    const token = getToken();
    await withAction(async () => unbanUser(token, userId), 'Unban user thành công');
  };

  return (
    <div className='user-manager-page'>
      <Card style={{ marginBottom: 16 }}>
        <Space direction='vertical' style={{ width: '100%' }} size='middle'>
          <Typography.Title level={4} style={{ margin: 0 }}>
            Quản lý User (Admin Tools)
          </Typography.Title>
          <Alert
            type='info'
            showIcon
            message='Danh sách user đang tổng hợp từ các endpoint account buyer/partner. Nếu API không trả đủ field, bạn vẫn có thể thao tác chính xác theo User ID.'
          />
          <UserToolbar
            keyword={keywordInput}
            onKeywordChange={setKeywordInput}
            onSearch={() => setKeywordFilter(keywordInput)}
            onReset={() => {
              setKeywordInput('');
              setKeywordFilter('');
            }}
            onRefresh={fetchUsers}
          />
        </Space>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <Space direction='vertical' style={{ width: '100%' }} size='middle'>
          <Space>
            <Typography.Text strong>User ID thao tác:</Typography.Text>
            <InputNumber
              min={1}
              value={selectedUserId}
              placeholder='Nhập User ID nếu không chọn từ bảng'
              onChange={(value) => setSelectedUserId(Number(value) || undefined)}
            />
          </Space>
          <UserTable
            loading={loading}
            dataSource={filteredUsers}
            selectedUserId={selectedUserId}
            onSelectUser={(user) => setSelectedUserId(user.id)}
            onBanUser={(user) => handleBan(user.id)}
            onUnbanUser={(user) => handleUnban(user.id)}
          />
        </Space>
      </Card>

      <UserActionPanel
        selectedUserId={selectedUserId}
        actionLoading={actionLoading}
        onChangeRole={async (role) => {
          const userId = ensureUserId();
          if (!userId) return;
          const token = getToken();
          await withAction(async () => changeUserRole(token, userId, role), 'Đổi role thành công');
        }}
        onUpdateBalance={async (type, amount) => {
          const userId = ensureUserId();
          if (!userId) return;
          const token = getToken();
          await withAction(async () => updateUserBalance(token, userId, type, amount), 'Cập nhật tài nguyên thành công');
        }}
        onAddItemWeb={async (itemId) => {
          const userId = ensureUserId();
          if (!userId) return;
          const token = getToken();
          await withAction(async () => addItemWeb(token, userId, itemId), 'Thêm item web thành công');
        }}
        onAddItem={async (itemId, quantity) => {
          const userId = ensureUserId();
          if (!userId) return;
          const token = getToken();
          await withAction(async () => addItem(token, userId, itemId, quantity), 'Thêm item thành công');
        }}
        onCreateDeTu={async (deTuId) => {
          const userId = ensureUserId();
          if (!userId) return;
          const token = getToken();
          await withAction(async () => createDeTu(token, userId, deTuId), 'Tạo đệ tử thành công');
        }}
        onUpdateMoney={async (amount) => {
          const userId = ensureUserId();
          if (!userId) return;
          const token = getToken();
          await withAction(async () => updateUserMoney(token, userId, amount), 'Cập nhật tiền thành công');
        }}
        onUpdateWalletStatus={async (status) => {
          const userId = ensureUserId();
          if (!userId) return;
          const token = getToken();
          await withAction(async () => updateUserWalletStatus(token, userId, status), 'Cập nhật trạng thái ví thành công');
        }}
      />
    </div>
  );
};

export default QuanLyUser;
