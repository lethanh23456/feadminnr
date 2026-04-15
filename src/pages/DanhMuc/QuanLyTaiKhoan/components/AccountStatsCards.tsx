import { Card, Col, Row, Statistic } from 'antd';
import type { AccountStats } from '../types';

interface AccountStatsCardsProps {
  stats: AccountStats;
}

const AccountStatsCards = ({ stats }: AccountStatsCardsProps) => {
  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic title='Tổng account trong kho' value={stats.total} />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic title='Đang bán' value={stats.selling} valueStyle={{ color: '#1677ff' }} />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic title='Đã bán' value={stats.sold} valueStyle={{ color: '#52c41a' }} />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title='Giá trị account đã mua'
            value={stats.totalValue}
            precision={0}
            formatter={(value) => `${Number(value || 0).toLocaleString('vi-VN')} VNĐ`}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default AccountStatsCards;
