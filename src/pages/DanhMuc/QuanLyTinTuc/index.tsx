import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Tag, Space, Popconfirm, message, Image } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { createPost, getAllPost, updatePost, deletePost, lockPost, unlockPost } from '@/services/Editor/api';

const { TextArea } = Input;

interface Post {
  id: number;
  title: string;
  content: string;
  url_anh: string;
  editor_realname: string;
  is_locked?: boolean;
}

const QuanLyTinTuc = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [form] = Form.useForm();
  const token = localStorage.getItem('token') || '';

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await getAllPost(token);
      setPosts(res.data?.data ?? res.data);
    } catch {
      message.error('Không thể tải danh sách tin tức');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const openCreate = () => {
    setEditingPost(null);
    form.resetFields();
    setModalOpen(true);
  };

  const openEdit = (post: Post) => {
    setEditingPost(post);
    form.setFieldsValue(post);
    setModalOpen(true);
  };

  const handleSubmit = async (values: Omit<Post, 'id'>) => {
    try {
      if (editingPost) {
        await updatePost(editingPost.id, values.title, values.content, values.url_anh, token);
        message.success('Cập nhật tin tức thành công');
      } else {
        await createPost(token, values.title, values.content, values.url_anh, values.editor_realname);
        message.success('Thêm tin tức thành công');
      }
      setModalOpen(false);
      fetchPosts();
    } catch {
      message.error('Có lỗi xảy ra');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePost(id, token);
      message.success('Đã xóa tin tức');
      fetchPosts();
    } catch {
      message.error('Xóa thất bại');
    }
  };

  const handleToggleLock = async (post: Post) => {
    try {
      if (post.is_locked) {
        await unlockPost(post.id, token);
        message.success('Đã mở khoá');
      } else {
        await lockPost(post.id, token);
        message.success('Đã khoá bài viết');
      }
      fetchPosts();
    } catch {
      message.error('Thao tác thất bại');
    }
  };

  const columns = [
    { title: '#', dataIndex: 'id', width: 60 },
    {
      title: 'Ảnh',
      dataIndex: 'url_anh',
      width: 80,
      render: (url: string) => url ? <Image src={url} width={56} height={40} style={{ objectFit: 'cover', borderRadius: 4 }} /> : '—',
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      ellipsis: true,
      render: (text: string) => <span style={{ fontWeight: 500 }}>{text}</span>,
    },
    { title: 'Tác giả', dataIndex: 'editor_realname', width: 140 },
    {
      title: 'Trạng thái',
      dataIndex: 'is_locked',
      width: 110,
      render: (locked: boolean) =>
        locked ? <Tag color="red">Khoá</Tag> : <Tag color="green">Hiển thị</Tag>,
    },
    {
      title: 'Hành động',
      width: 200,
      render: (_: unknown, record: Post) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => openEdit(record)}>Sửa</Button>
          <Button
            size="small"
            icon={record.is_locked ? <UnlockOutlined /> : <LockOutlined />}
            onClick={() => handleToggleLock(record)}
          >
            {record.is_locked ? 'Mở' : 'Khoá'}
          </Button>
          <Popconfirm title="Xác nhận xoá tin này?" onConfirm={() => handleDelete(record.id)} okText="Xoá" cancelText="Huỷ">
            <Button size="small" danger icon={<DeleteOutlined />}>Xoá</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Quản lý tin tức</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>Thêm tin tức</Button>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={posts}
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 800 }}
      />

      <Modal
        title={editingPost ? 'Chỉnh sửa tin tức' : 'Thêm tin tức'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={() => form.submit()}
        okText="Lưu"
        cancelText="Huỷ"
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: 'Nhập tiêu đề' }]}>
            <Input placeholder="Nhập tiêu đề bài viết" />
          </Form.Item>
          <Form.Item name="content" label="Nội dung" rules={[{ required: true, message: 'Nhập nội dung' }]}>
            <TextArea rows={4} placeholder="Nhập nội dung..." />
          </Form.Item>
          <Form.Item name="url_anh" label="URL ảnh">
            <Input placeholder="https://..." />
          </Form.Item>
          {!editingPost && (
            <Form.Item name="editor_realname" label="Tác giả">
              <Input placeholder="Tên tác giả" />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default QuanLyTinTuc;