import { Button, Card, Col, Input, Row, Space, Typography } from 'antd';
import type { GameUserProfile } from '../types';

interface UserLookupPanelProps {
  authId: string;
  loading?: boolean;
  profile?: GameUserProfile | null;
  onAuthIdChange: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
}

const UserLookupPanel = ({
  authId,
  loading,
  profile,
  onAuthIdChange,
  onSearch,
  onClear,
}: UserLookupPanelProps) => {
  return (
    <Card style={{ marginBottom: 16 }}>
      <Row gutter={[12, 12]} align='middle'>
        <Col xs={24} md={16}>
          <Input
            value={authId}
            size='large'
            allowClear
            placeholder='Nhập authId để tra cứu user bất kỳ'
            onChange={(e) => onAuthIdChange(e.target.value)}
            onPressEnter={onSearch}
          />
        </Col>
        <Col xs={24} md={8}>
          <Space wrap>
            <Button type='primary' size='large' onClick={onSearch} loading={loading}>
              Tra cứu dữ liệu user
            </Button>
            <Button size='large' onClick={onClear} disabled={loading}>
              Làm trống
            </Button>
          </Space>
        </Col>
      </Row>

      <Typography.Paragraph type='secondary' style={{ marginBottom: 0, marginTop: 10 }}>
        Dữ liệu sẽ tải đồng thời: hồ sơ user, vàng/ngọc nạp web, item web, toàn bộ item, đệ tử và ví.
      </Typography.Paragraph>

      {profile ? (
        <Typography.Paragraph style={{ marginBottom: 0, marginTop: 8 }}>
          User hiện tại: <Typography.Text strong>{String(profile.username || profile.name || profile.authId || '-')}</Typography.Text>
        </Typography.Paragraph>
      ) : null}
    </Card>
  );
};

export default UserLookupPanel;
