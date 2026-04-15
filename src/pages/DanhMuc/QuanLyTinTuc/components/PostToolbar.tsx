import { PlusOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Input, Space, Typography } from 'antd';

interface PostToolbarProps {
	editorFilter: string;
	onEditorFilterChange: (value: string) => void;
	onApplyEditorFilter: () => void;
	onResetFilter: () => void;
	onRefresh: () => void;
	onCreate: () => void;
}

const PostToolbar = ({
	editorFilter,
	onEditorFilterChange,
	onApplyEditorFilter,
	onResetFilter,
	onRefresh,
	onCreate,
}: PostToolbarProps) => {
	return (
		<Card style={{ marginBottom: 16 }}>
			<Space direction='vertical' size={12} style={{ width: '100%' }}>
				<Typography.Title level={4} style={{ margin: 0 }}>
					Quản lý tin tức
				</Typography.Title>
				<Space wrap>
					<Input
						value={editorFilter}
						onChange={(e) => onEditorFilterChange(e.target.value)}
						onPressEnter={onApplyEditorFilter}
						placeholder='Nhập tên editor để lọc bài viết'
						style={{ width: 320 }}
						allowClear
					/>
					<Button icon={<SearchOutlined />} onClick={onApplyEditorFilter}>
						Xem bài của editor
					</Button>
					<Button onClick={onResetFilter}>Bỏ lọc</Button>
					<Button icon={<ReloadOutlined />} onClick={onRefresh}>
						Tải lại
					</Button>
					<Button type='primary' icon={<PlusOutlined />} onClick={onCreate}>
						Tạo bài viết
					</Button>
				</Space>
			</Space>
		</Card>
	);
};

export default PostToolbar;
