import { Card, Col, Row, Statistic, Typography } from 'antd';
import type { BalanceWebInfo, GameUserProfile, WalletInfo } from '../types';

interface UserOverviewCardsProps {
  profile?: GameUserProfile | null;
  balanceWeb?: BalanceWebInfo | null;
  wallet?: WalletInfo | null;
}

const toNumber = (value: unknown) => {
  const num = Number(value || 0);
  return Number.isNaN(num) ? 0 : num;
};

const UserOverviewCards = ({ profile, balanceWeb, wallet }: UserOverviewCardsProps) => {
  return (
    <>
      <Row gutter={[12, 12]} style={{ marginBottom: 12 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title='Auth ID'
              value={String(profile?.authId || profile?.id || '-')}
              valueStyle={{ fontSize: 18 }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title='Tên user'
              value={String(profile?.username || profile?.name || '-')}
              valueStyle={{ fontSize: 18 }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title='Vàng nạp từ web' value={toNumber(balanceWeb?.vangNapWeb)} />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title='Ngọc nạp từ web' value={toNumber(balanceWeb?.ngocNapWeb)} />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginBottom: 16 }}>
        <Typography.Text type='secondary'>
          Số dư ví hiện tại: 
        </Typography.Text>
        <Typography.Text strong>
          {toNumber(wallet?.balance || wallet?.cash).toLocaleString('vi-VN')}
        </Typography.Text>
      </Card>
    </>
  );
};

export default UserOverviewCards;
