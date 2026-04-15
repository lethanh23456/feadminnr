import type { Post } from '../types';
import { CalendarOutlined, EditOutlined, IdcardOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Descriptions, Divider, Drawer, Image, Space, Spin, Tag, Typography } from 'antd';

interface PostDetailDrawerProps {
	open: boolean;
	loading: boolean;
	post: Post | null;
	onClose: () => void;
	onEdit: (post: Post) => void;
}

const PostDetailDrawer = ({ open, loading, post, onClose, onEdit }: PostDetailDrawerProps) => {
	return (
		<Drawer
			title='Chi tiết bài viết'
			open={open}
			onClose={onClose}
			width={720}
			extra={
				post ? (
					<Button type='primary' icon={<EditOutlined />} onClick={() => onEdit(post)}>
						Cập nhật
					</Button>
				) : null
			}
		>
			{loading ? (
				<div style={{ textAlign: 'center', padding: '48px 0' }}>
					<Spin />
				</div>
			) : !post ? (
				<Typography.Text type='secondary'>Không có dữ liệu bài viết.</Typography.Text>
			) : (
				<Space direction='vertical' size={16} style={{ width: '100%' }}>
					<Typography.Title level={4} style={{ margin: 0 }}>
						{post.title}
					</Typography.Title>
					<Space>
						<Tag color={post.is_locked ? 'red' : 'green'}>{post.is_locked ? 'Đang khóa' : 'Đang hiển thị'}</Tag>
					</Space>
					<Descriptions bordered size='small' column={1}>
						<Descriptions.Item label={<Space><IdcardOutlined />ID</Space>}>{post.id}</Descriptions.Item>
						<Descriptions.Item label={<Space><UserOutlined />Editor</Space>}>{post.editor_realname || '—'}</Descriptions.Item>
						<Descriptions.Item label={<Space><CalendarOutlined />Tạo lúc</Space>}>{post.create_at || post.createdAt || '—'}</Descriptions.Item>
						<Descriptions.Item label={<Space><CalendarOutlined />Cập nhật</Space>}>{post.update_at || post.updatedAt || '—'}</Descriptions.Item>
					</Descriptions>
					{post.url_anh ? <Image src={post.url_anh} style={{ borderRadius: 8 }} /> : null}
					<Divider style={{ margin: '8px 0' }} />
					<div>
						<Typography.Title level={5}>Nội dung</Typography.Title>
						<Typography.Paragraph style={{ whiteSpace: 'pre-wrap' }}>{post.content || '—'}</Typography.Paragraph>
					</div>
				</Space>
			)}
		</Drawer>
	);
};

export default PostDetailDrawer;
