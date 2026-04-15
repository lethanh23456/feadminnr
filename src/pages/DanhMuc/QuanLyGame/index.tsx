

import { useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, Row, Typography, message } from 'antd';
import {
    getAnyPlayerBalanceWebByAuthId,
    getAnyPlayerDeTuByAuthId,
    getAnyPlayerItemWebByAuthId,
    getAnyPlayerProfileByAuthId,
    getAnyPlayerUserItemsByAuthId,
    getAnyPlayerWalletByAuthId,
    getTemporaryBannedPlayers,
    lockPlayerTemporarily,
    sendMailToPlayer,
    unlockPlayerTemporarily,
} from '@/services/PlayerManager/api';
import BanManagementCard from './components/BanManagementCard';
import MailNotificationCard from './components/MailNotificationCard';
import UserDataTabs from './components/UserDataTabs';
import UserLookupPanel from './components/UserLookupPanel';
import UserOverviewCards from './components/UserOverviewCards';
import type {
    BalanceWebInfo,
    BanFormValues,
    BanRecord,
    DiscipleRecord,
    GameItemRecord,
    GameUserProfile,
    MailFormValues,
    WalletInfo,
} from './types';

const parseData = <T,>(response: any): T | undefined => {
    return (response?.data?.data ?? response?.data) as T | undefined;
};

const getAuthToken = () => localStorage.getItem('token') || localStorage.getItem('access_token') || '';

const normalizeArray = <T,>(value: any): T[] => {
    if (Array.isArray(value)) return value as T[];
    if (Array.isArray(value?.items)) return value.items as T[];
    if (Array.isArray(value?.list)) return value.list as T[];
    if (Array.isArray(value?.rows)) return value.rows as T[];
    if (Array.isArray(value?.data)) return value.data as T[];
    return [];
};

const normalizeObject = <T,>(value: any): T | null => {
    if (!value || Array.isArray(value) || typeof value !== 'object') return null;
    return value as T;
};

const QuanLyGame = () => {
    const token = getAuthToken();

    const [authId, setAuthId] = useState('');

    const [profile, setProfile] = useState<GameUserProfile | null>(null);
    const [balanceWeb, setBalanceWeb] = useState<BalanceWebInfo | null>(null);
    const [itemWeb, setItemWeb] = useState<GameItemRecord[]>([]);
    const [userItems, setUserItems] = useState<GameItemRecord[]>([]);
    const [disciples, setDisciples] = useState<DiscipleRecord[]>([]);
    const [wallet, setWallet] = useState<WalletInfo | null>(null);
    const [bannedUsers, setBannedUsers] = useState<BanRecord[]>([]);

    const [loadingUserData, setLoadingUserData] = useState(false);
    const [loadingBanList, setLoadingBanList] = useState(false);
    const [submittingMail, setSubmittingMail] = useState(false);
    const [submittingBan, setSubmittingBan] = useState(false);

    const selectedAuthId = useMemo(() => authId.trim(), [authId]);

    const clearUserData = () => {
        setProfile(null);
        setBalanceWeb(null);
        setItemWeb([]);
        setUserItems([]);
        setDisciples([]);
        setWallet(null);
    };

    const loadBannedUsers = async () => {
        try {
            setLoadingBanList(true);
            const response = await getTemporaryBannedPlayers(token);
            const raw = parseData<any>(response);
            setBannedUsers(normalizeArray<BanRecord>(raw));
        } catch {
            message.error('Không thể tải danh sách user đang bị khóa tạm thời');
        } finally {
            setLoadingBanList(false);
        }
    };

    const loadUserBundle = async () => {
        if (!selectedAuthId) {
            message.warning('Vui lòng nhập authId trước khi tra cứu');
            return;
        }

        try {
            setLoadingUserData(true);

            const [profileRes, balanceRes, itemWebRes, userItemsRes, deTuRes, walletRes] = await Promise.all([
                getAnyPlayerProfileByAuthId(selectedAuthId, token),
                getAnyPlayerBalanceWebByAuthId(selectedAuthId, token),
                getAnyPlayerItemWebByAuthId(selectedAuthId, token),
                getAnyPlayerUserItemsByAuthId(selectedAuthId, token),
                getAnyPlayerDeTuByAuthId(selectedAuthId, token),
                getAnyPlayerWalletByAuthId(selectedAuthId, token),
            ]);

            setProfile(normalizeObject<GameUserProfile>(parseData<any>(profileRes)));
            setBalanceWeb(normalizeObject<BalanceWebInfo>(parseData<any>(balanceRes)));
            setItemWeb(normalizeArray<GameItemRecord>(parseData<any>(itemWebRes)));
            setUserItems(normalizeArray<GameItemRecord>(parseData<any>(userItemsRes)));
            setDisciples(normalizeArray<DiscipleRecord>(parseData<any>(deTuRes)));
            setWallet(normalizeObject<WalletInfo>(parseData<any>(walletRes)));

            message.success('Đã tải dữ liệu người chơi thành công');
        } catch {
            message.error('Không thể lấy đủ dữ liệu người chơi. Vui lòng kiểm tra lại authId hoặc API.');
        } finally {
            setLoadingUserData(false);
        }
    };

    const handleSendMail = async (values: MailFormValues) => {
        try {
            setSubmittingMail(true);
            await sendMailToPlayer(
                {
                    who: values.who,
                    title: values.title,
                    content: values.content,
                },
                token,
            );
            message.success('Gửi thông báo email thành công');
        } catch {
            message.error('Gửi thông báo email thất bại');
        } finally {
            setSubmittingMail(false);
        }
    };

    const handleBanUser = async (values: BanFormValues) => {
        try {
            setSubmittingBan(true);
            await lockPlayerTemporarily(
                {
                    userId: Number(values.userId),
                    phut: Number(values.phut),
                    why: values.why,
                },
                token,
            );
            message.success('Đã khóa tài khoản tạm thời thành công');
            await loadBannedUsers();
        } catch {
            message.error('Khóa tạm thời tài khoản thất bại');
        } finally {
            setSubmittingBan(false);
        }
    };

    const handleUnbanUser = async (userId: string) => {
        if (!userId) {
            message.warning('Không xác định được user cần mở khóa');
            return;
        }

        try {
            setSubmittingBan(true);
            await unlockPlayerTemporarily(userId, token);
            message.success('Đã mở khóa tài khoản thành công');
            await loadBannedUsers();
        } catch {
            message.error('Mở khóa tài khoản thất bại');
        } finally {
            setSubmittingBan(false);
        }
    };

    useEffect(() => {
        loadBannedUsers();
    }, []);

    return (
        <div style={{ padding: 24 }}>
            <Row justify='space-between' align='middle' gutter={[12, 12]} style={{ marginBottom: 12 }}>
                <Col>
                    <Typography.Title level={3} style={{ margin: 0 }}>
                        Quản lý game - Player Manager
                    </Typography.Title>
                    <Typography.Text type='secondary'>
                        Tra cứu dữ liệu người chơi theo authId, gửi thông báo, khóa/mở khóa tạm và theo dõi danh
                        sách user bị ban.
                    </Typography.Text>
                </Col>

                <Col>
                    <Button onClick={loadBannedUsers} loading={loadingBanList}>
                        Làm mới danh sách ban
                    </Button>
                </Col>
            </Row>

            <UserLookupPanel
                authId={authId}
                loading={loadingUserData}
                profile={profile}
                onAuthIdChange={setAuthId}
                onSearch={loadUserBundle}
                onClear={() => {
                    setAuthId('');
                    clearUserData();
                }}
            />

            <UserOverviewCards profile={profile} balanceWeb={balanceWeb} wallet={wallet} />

            <UserDataTabs
                loading={loadingUserData}
                itemWeb={itemWeb}
                userItems={userItems}
                disciples={disciples}
                wallet={wallet}
            />

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={11}>
                    <MailNotificationCard
                        loading={submittingMail}
                        initialAuthId={selectedAuthId}
                        onSubmit={handleSendMail}
                    />
                </Col>

                <Col xs={24} lg={13}>
                    <BanManagementCard
                        loading={loadingBanList || submittingBan}
                        data={bannedUsers}
                        onBan={handleBanUser}
                        onUnban={handleUnbanUser}
                        onReload={loadBannedUsers}
                    />
                </Col>
            </Row>

            <Card style={{ marginTop: 16 }}>
                <Typography.Paragraph style={{ marginBottom: 0 }}>
                    Mẹo vận hành: khi gửi thông báo bảo trì, hãy khóa tạm tài khoản vi phạm riêng lẻ để tránh ảnh
                    hưởng toàn bộ người chơi.
                </Typography.Paragraph>
            </Card>
        </div>
    );
};

export default QuanLyGame;
