import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row } from 'antd';

interface UserToolbarProps {
  keyword: string;
  onKeywordChange: (value: string) => void;
  onSearch: () => void;
  onReset: () => void;
  onRefresh: () => void;
}

const UserToolbar = ({ keyword, onKeywordChange, onSearch, onReset, onRefresh }: UserToolbarProps) => {
  return (
    <Row gutter={[12, 12]} align='middle'>
      <Col flex='auto'>
        <Input
          allowClear
          value={keyword}
          placeholder='Tìm theo user id / username / email'
          onChange={(event) => onKeywordChange(event.target.value)}
          onPressEnter={onSearch}
        />
      </Col>
      <Col>
        <Button type='primary' icon={<SearchOutlined />} onClick={onSearch}>
          Tìm kiếm
        </Button>
      </Col>
      <Col>
        <Button onClick={onReset}>Xóa lọc</Button>
      </Col>
      <Col>
        <Button icon={<ReloadOutlined />} onClick={onRefresh}>
          Tải lại
        </Button>
      </Col>
    </Row>
  );
};

export default UserToolbar;
