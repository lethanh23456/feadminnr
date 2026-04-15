import type { Post } from '../types';
import { DeleteOutlined, EditOutlined, EyeOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Button, Image, Popconfirm, Space, Table, Tag, Tooltip, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface PostTableProps {
	loading: boolean;
	dataSource: Post[];
	onViewDetail: (postId: number) => void;
	onEdit: (post: Post) => void;
	onDelete: (postId: number) => void;
	onToggleLock: (post: Post) => void;
}

const PostTable = ({ loading, dataSource, onViewDetail, onEdit, onDelete, onToggleLock }: PostTableProps) => {
	const columns: ColumnsType<Post> = [
		{ title: '#', dataIndex: 'id', width: 70, fixed: 'left' },
		{
			title: 'Ảnh',
			dataIndex: 'url_anh',
			width: 90,
			render: (url: string) =>
				url ? (
					<Image src={url} width={56} height={40} style={{ objectFit: 'cover', borderRadius: 4 }} />
				) : (
					<Typography.Text type='secondary'>—</Typography.Text>
				),
		},
		{
			title: 'Tiêu đề',
			dataIndex: 'title',
			ellipsis: { showTitle: false },
			render: (title: string) => (
				<Tooltip title={title}>
					<Typography.Text strong>{title}</Typography.Text>
				</Tooltip>
			),
		},
		{ title: 'Editor', dataIndex: 'editor_realname', width: 180 },
		{
			title: 'Trạng thái',
			dataIndex: 'is_locked',
			width: 130,
			render: (isLocked?: boolean) => <Tag color={isLocked ? 'red' : 'green'}>{isLocked ? 'Khóa' : 'Hiển thị'}</Tag>,
		},
		{
			title: 'Thao tác',
			width: 320,
			fixed: 'right',
			render: (_, record) => (
				<Space wrap>
					<Button size='small' icon={<EyeOutlined />} onClick={() => onViewDetail(record.id)}>
						Chi tiết
					</Button>
					<Button size='small' icon={<EditOutlined />} onClick={() => onEdit(record)}>
						Sửa
					</Button>
					<Button
						size='small'
						icon={record.is_locked ? <UnlockOutlined /> : <LockOutlined />}
						onClick={() => onToggleLock(record)}
					>
						{record.is_locked ? 'Mở khóa' : 'Khóa'}
					</Button>
					<Popconfirm
						title='Xóa bài viết này?'
						description='Hành động này không thể hoàn tác.'
						okText='Xóa'
						cancelText='Hủy'
						onConfirm={() => onDelete(record.id)}
					>
						<Button size='small' danger icon={<DeleteOutlined />}>
							Xóa
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<Table<Post>
			rowKey='id'
			columns={columns}
			dataSource={dataSource}
			loading={loading}
			pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (total) => `Tổng ${total} bài viết` }}
			scroll={{ x: 1100 }}
		/>
	);
};

export default PostTable;
