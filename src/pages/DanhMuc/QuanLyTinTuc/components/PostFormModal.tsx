import type { Post, PostFormValues } from '../types';
import { Form, Input, Modal } from 'antd';

const { TextArea } = Input;

interface PostFormModalProps {
	open: boolean;
	loading: boolean;
	editingPost: Post | null;
	onCancel: () => void;
	onSubmit: (values: PostFormValues) => void;
}

const PostFormModal = ({ open, loading, editingPost, onCancel, onSubmit }: PostFormModalProps) => {
	const [form] = Form.useForm<PostFormValues>();

	return (
		<Modal
			title={editingPost ? 'Cập nhật bài viết' : 'Tạo bài viết mới'}
			open={open}
			onCancel={onCancel}
			onOk={() => form.submit()}
			okText='Lưu'
			cancelText='Hủy'
			confirmLoading={loading}
			destroyOnClose
			afterOpenChange={(nextOpen) => {
				if (nextOpen) {
					form.setFieldsValue(
						editingPost
							? {
								title: editingPost.title,
								content: editingPost.content,
								url_anh: editingPost.url_anh,
								editor_realname: editingPost.editor_realname,
							}
							: {
								title: '',
								content: '',
								url_anh: '',
								editor_realname: '',
							},
					);
				} else {
					form.resetFields();
				}
			}}
		>
			<Form form={form} layout='vertical' onFinish={onSubmit}>
				<Form.Item name='title' label='Tiêu đề' rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}>
					<Input placeholder='Nhập tiêu đề bài viết' maxLength={255} showCount />
				</Form.Item>
				<Form.Item name='content' label='Nội dung' rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}>
					<TextArea rows={6} placeholder='Nhập nội dung bài viết...' showCount maxLength={10000} />
				</Form.Item>
				<Form.Item name='url_anh' label='URL ảnh'>
					<Input placeholder='https://example.com/image.jpg' />
				</Form.Item>
				{!editingPost && (
					<Form.Item
						name='editor_realname'
						label='Tên editor'
						rules={[{ required: true, message: 'Vui lòng nhập tên editor' }]}
					>
						<Input placeholder='Nhập tên editor tạo bài' />
					</Form.Item>
				)}
			</Form>
		</Modal>
	);
};

export default PostFormModal;
