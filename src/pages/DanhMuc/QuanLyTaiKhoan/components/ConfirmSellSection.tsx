import { Button, Card, Form, Input, Typography } from 'antd';

interface ConfirmSellSectionProps {
  loading?: boolean;
  onConfirm: (confirmToken: string) => Promise<void> | void;
}

const ConfirmSellSection = ({ loading, onConfirm }: ConfirmSellSectionProps) => {
  const [form] = Form.useForm<{ token: string }>();

  const onFinish = async (values: { token: string }) => {
    await onConfirm(values.token.trim());
    form.resetFields();
  };

  return (
    <Card bordered={false} style={{ marginBottom: 16 }}>
      <Typography.Title level={5} style={{ marginTop: 0 }}>
        Xác nhận đăng bán qua email link
      </Typography.Title>
      <Typography.Paragraph type='secondary'>
        Dán mã token từ email xác nhận để kích hoạt tài khoản vừa đăng bán.
      </Typography.Paragraph>

      <Form form={form} layout='inline' onFinish={onFinish}>
        <Form.Item
          name='token'
          style={{ flex: 1, minWidth: 280 }}
          rules={[{ required: true, message: 'Vui lòng nhập token xác nhận' }]}
        >
          <Input placeholder='Nhập token từ email' allowClear />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' loading={loading}>
            Xác nhận đăng bán
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ConfirmSellSection;
