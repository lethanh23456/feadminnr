import { useEffect } from 'react';
import { Button, Card, Form, Input, Radio, Space, Typography } from 'antd';
import type { MailFormValues } from '../types';

interface MailNotificationCardProps {
  loading?: boolean;
  initialAuthId?: string;
  onSubmit: (values: MailFormValues) => Promise<void>;
}

const MailNotificationCard = ({ loading, initialAuthId, onSubmit }: MailNotificationCardProps) => {
  const [form] = Form.useForm<MailFormValues>();

  useEffect(() => {
    if (!initialAuthId) return;
    const currentWho = form.getFieldValue('who');
    if (!currentWho || currentWho === 'ALL') {
      form.setFieldValue('who', initialAuthId);
    }
  }, [initialAuthId, form]);

  return (
    <Card title='Gửi thông báo email' style={{ height: '100%' }}>
      <Form
        layout='vertical'
        form={form}
        initialValues={{ who: initialAuthId || 'ALL' }}
        onFinish={onSubmit}
      >
        <Form.Item name='who' label='Đối tượng nhận'>
          <Radio.Group>
            <Space direction='vertical'>
              <Radio value='ALL'>Tất cả user (ALL)</Radio>
              <Radio value={initialAuthId || ''} disabled={!initialAuthId}>
                User đang tra cứu ({initialAuthId || 'chưa chọn'})
              </Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name='title'
          label='Tiêu đề'
          rules={[{ required: true, message: 'Vui lòng nhập tiêu đề thông báo' }]}
        >
          <Input placeholder='Ví dụ: Thông báo bảo trì máy chủ' maxLength={120} />
        </Form.Item>

        <Form.Item
          name='content'
          label='Nội dung'
          rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
        >
          <Input.TextArea rows={5} placeholder='Nội dung mail gửi tới user...' showCount maxLength={1000} />
        </Form.Item>

        <Typography.Paragraph type='secondary'>
          Nên viết rõ thời gian áp dụng, phạm vi ảnh hưởng và hướng dẫn người chơi.
        </Typography.Paragraph>

        <Button type='primary' htmlType='submit' loading={loading}>
          Gửi thông báo
        </Button>
      </Form>
    </Card>
  );
};

export default MailNotificationCard;
