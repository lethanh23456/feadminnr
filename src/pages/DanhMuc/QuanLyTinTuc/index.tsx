import { createPost, deletePost, getAllPost, getPostById, lockPost, unlockPost, updatePost } from '@/services/Editor/api';
import { Card, message } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import PostDetailDrawer from './components/PostDetailDrawer';
import PostFormModal from './components/PostFormModal';
import PostTable from './components/PostTable';
import PostToolbar from './components/PostToolbar';
import type { Post, PostFormValues } from './types';
import './style.less';

const normalizePosts = (raw: any): Post[] => {
	const source = raw?.data?.posts ?? raw?.posts ?? raw?.data?.data ?? raw?.data ?? raw;
	if (!Array.isArray(source)) return [];
	return source.map((item) => ({
		...item,
		is_locked: typeof item?.is_locked === 'boolean' ? item.is_locked : item?.status === 'LOCKED',
	}));
};

const normalizePost = (raw: any): Post | null => {
	const source = raw?.data?.post ?? raw?.post ?? raw?.data?.data ?? raw?.data ?? raw;
	if (!source || typeof source !== 'object') return null;
	return {
		...source,
		is_locked: typeof source?.is_locked === 'boolean' ? source.is_locked : source?.status === 'LOCKED',
	} as Post;
};

const getToken = () => localStorage.getItem('token') || localStorage.getItem('access_token') || '';

const QuanLyTinTuc = () => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(false);
	const [submitLoading, setSubmitLoading] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [editingPost, setEditingPost] = useState<Post | null>(null);
	const [detailOpen, setDetailOpen] = useState(false);
	const [detailLoading, setDetailLoading] = useState(false);
	const [detailPost, setDetailPost] = useState<Post | null>(null);
	const [editorInput, setEditorInput] = useState('');
	const [editorFilter, setEditorFilter] = useState('');

	const fetchPosts = async () => {
		const token = getToken();
		setLoading(true);
		try {
			const res = await getAllPost(token);
			setPosts(normalizePosts(res));
		} catch {
			message.error('Không thể tải danh sách bài viết');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	const filteredPosts = useMemo(() => {
		const keyword = editorFilter.trim().toLowerCase();
		if (!keyword) return posts;
		return posts.filter((item) => item.editor_realname?.toLowerCase().includes(keyword));
	}, [editorFilter, posts]);

	const handleApplyEditorFilter = () => {
		setEditorFilter(editorInput.trim());
	};

	const handleResetFilter = () => {
		setEditorInput('');
		setEditorFilter('');
	};

	const openCreateModal = () => {
		setEditingPost(null);
		setModalOpen(true);
	};

	const openEditModal = (post: Post) => {
		setEditingPost(post);
		setModalOpen(true);
	};

	const handleSubmit = async (values: PostFormValues) => {
		const token = getToken();
		setSubmitLoading(true);
		try {
			if (editingPost) {
				await updatePost(editingPost.id, values.title, values.content, values.url_anh, token);
				message.success('Cập nhật bài viết thành công');
			} else {
				await createPost(token, values.title, values.content, values.url_anh, values.editor_realname || '');
				message.success('Tạo bài viết thành công');
			}
			setModalOpen(false);
			setEditingPost(null);
			await fetchPosts();
		} catch {
			message.error('Không thể lưu bài viết');
		} finally {
			setSubmitLoading(false);
		}
	};

	const handleDeletePost = async (postId: number) => {
		const token = getToken();
		try {
			await deletePost(postId, token);
			message.success('Xóa bài viết thành công');
			await fetchPosts();
			if (detailPost?.id === postId) {
				setDetailOpen(false);
				setDetailPost(null);
			}
		} catch {
			message.error('Xóa bài viết thất bại');
		}
	};

	const handleToggleLockPost = async (post: Post) => {
		const token = getToken();
		try {
			if (post.is_locked) {
				await unlockPost(post.id, token);
				message.success('Mở khóa bài viết thành công');
			} else {
				await lockPost(post.id, token);
				message.success('Khóa bài viết thành công');
			}
			await fetchPosts();
			if (detailPost?.id === post.id) {
				setDetailPost((prev) => (prev ? { ...prev, is_locked: !prev.is_locked } : prev));
			}
		} catch {
			message.error('Không thể cập nhật trạng thái khóa');
		}
	};

	const handleViewDetail = async (postId: number) => {
		const token = getToken();
		setDetailOpen(true);
		setDetailLoading(true);
		try {
			const res = await getPostById(postId, token);
			const post = normalizePost(res);
			if (!post) {
				message.error('Không lấy được chi tiết bài viết');
				return;
			}
			setDetailPost(post);
		} catch {
			message.error('Không thể tải chi tiết bài viết');
		} finally {
			setDetailLoading(false);
		}
	};

	return (
		<div className='news-manager-page' style={{ padding: 24 }}>
			<PostToolbar
				editorFilter={editorInput}
				onEditorFilterChange={setEditorInput}
				onApplyEditorFilter={handleApplyEditorFilter}
				onResetFilter={handleResetFilter}
				onRefresh={fetchPosts}
				onCreate={openCreateModal}
			/>

			<Card>
				<PostTable
					loading={loading}
					dataSource={filteredPosts}
					onViewDetail={handleViewDetail}
					onEdit={openEditModal}
					onDelete={handleDeletePost}
					onToggleLock={handleToggleLockPost}
				/>
			</Card>

			<PostFormModal
				open={modalOpen}
				loading={submitLoading}
				editingPost={editingPost}
				onCancel={() => {
					setModalOpen(false);
					setEditingPost(null);
				}}
				onSubmit={handleSubmit}
			/>

			<PostDetailDrawer
				open={detailOpen}
				loading={detailLoading}
				post={detailPost}
				onClose={() => {
					setDetailOpen(false);
					setDetailPost(null);
				}}
				onEdit={(post) => {
					setDetailOpen(false);
					openEditModal(post);
				}}
			/>
		</div>
	);
};

export default QuanLyTinTuc;