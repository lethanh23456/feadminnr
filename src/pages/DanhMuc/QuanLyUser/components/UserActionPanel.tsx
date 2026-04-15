import { Card, Col, Form, InputNumber, Row, Select, Space, Switch, Typography, Button } from 'antd';

type ResourceType = 'vang' | 'ngoc';

interface UserActionPanelProps {
  selectedUserId?: number;
  actionLoading?: boolean;
  onChangeRole: (role: string) => Promise<void>;
  onUpdateBalance: (type: ResourceType, amount: number) => Promise<void>;
  onAddItemWeb: (itemId: number) => Promise<void>;
  onAddItem: (itemId: number, quantity: number) => Promise<void>;
  onCreateDeTu: (deTuId: number) => Promise<void>;
  onUpdateMoney: (amount: number) => Promise<void>;
  onUpdateWalletStatus: (status: boolean) => Promise<void>;
}

const ROLE_OPTIONS = ['USER', 'MOD', 'ADMIN', 'PARTNER'].map((role) => ({ value: role, label: role }));

const UserActionPanel = ({
  selectedUserId,
  actionLoading,
  onChangeRole,
  onUpdateBalance,
  onAddItemWeb,
  onAddItem,
  onCreateDeTu,
  onUpdateMoney,
  onUpdateWalletStatus,
}: UserActionPanelProps) => {
  const [roleForm] = Form.useForm<{ role: string }>();
  const [balanceForm] = Form.useForm<{ type: ResourceType; amount: number }>();
  const [itemWebForm] = Form.useForm<{ itemId: number }>();
  const [itemForm] = Form.useForm<{ itemId: number; quantity: number }>();
  const [deTuForm] = Form.useForm<{ deTuId: number }>();
  const [moneyForm] = Form.useForm<{ amount: number }>();
  const [walletForm] = Form.useForm<{ status: boolean }>();

  const disabled = !selectedUserId;

  return (
    <Card title='Bảng thao tác nhanh theo User ID' className='user-action-panel'>
      <Typography.Paragraph type={selectedUserId ? undefined : 'secondary'}>
        {selectedUserId ? `Đang thao tác với User ID: ${selectedUserId}` : 'Vui lòng chọn user ở bảng phía trên hoặc nhập ID thủ công sau.'}
      </Typography.Paragraph>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card size='small' title='Đổi role'>
            <Form
              form={roleForm}
              layout='vertical'
              initialValues={{ role: 'USER' }}
              onFinish={async (values) => onChangeRole(values.role)}
            >
              <Form.Item name='role' label='Role mới' rules={[{ required: true, message: 'Vui lòng chọn role' }]}>
                <Select options={ROLE_OPTIONS} />
              </Form.Item>
              <Button htmlType='submit' type='primary' loading={actionLoading} disabled={disabled}>
                Cập nhật role
              </Button>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card size='small' title='Cộng / trừ tài nguyên'>
            <Form
              form={balanceForm}
              layout='vertical'
              initialValues={{ type: 'vang', amount: 0 }}
              onFinish={async (values) => onUpdateBalance(values.type, Number(values.amount))}
            >
              <Form.Item name='type' label='Loại tài nguyên' rules={[{ required: true }]}>
                <Select
                  options={[
                    { value: 'vang', label: 'Vàng' },
                    { value: 'ngoc', label: 'Ngọc' },
                  ]}
                />
              </Form.Item>
              <Form.Item name='amount' label='Số lượng (+/-)' rules={[{ required: true, message: 'Nhập số lượng' }]}>
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
              <Button htmlType='submit' type='primary' loading={actionLoading} disabled={disabled}>
                Cập nhật tài nguyên
              </Button>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card size='small' title='Thêm item web'>
            <Form form={itemWebForm} layout='vertical' onFinish={async (values) => onAddItemWeb(Number(values.itemId))}>
              <Form.Item name='itemId' label='Item ID web' rules={[{ required: true, message: 'Nhập item ID' }]}>
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
              <Button htmlType='submit' type='primary' loading={actionLoading} disabled={disabled}>
                Thêm item web
              </Button>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card size='small' title='Thêm item game'>
            <Form
              form={itemForm}
              layout='vertical'
              initialValues={{ quantity: 1 }}
              onFinish={async (values) => onAddItem(Number(values.itemId), Number(values.quantity))}
            >
              <Space.Compact style={{ width: '100%' }} block>
                <Form.Item name='itemId' style={{ width: '50%', marginBottom: 0 }} rules={[{ required: true }]}>
                  <InputNumber min={1} placeholder='Item ID' style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name='quantity' style={{ width: '50%', marginBottom: 0 }} rules={[{ required: true }]}>
                  <InputNumber min={1} placeholder='Số lượng' style={{ width: '100%' }} />
                </Form.Item>
              </Space.Compact>
              <Button style={{ marginTop: 12 }} htmlType='submit' type='primary' loading={actionLoading} disabled={disabled}>
                Thêm item
              </Button>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card size='small' title='Tạo đệ tử'>
            <Form form={deTuForm} layout='vertical' onFinish={async (values) => onCreateDeTu(Number(values.deTuId))}>
              <Form.Item name='deTuId' label='DeTu ID' rules={[{ required: true, message: 'Nhập deTu ID' }]}>
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
              <Button htmlType='submit' type='primary' loading={actionLoading} disabled={disabled}>
                Tạo đệ tử
              </Button>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card size='small' title='Ví & tiền'>
            <Form form={moneyForm} layout='vertical' onFinish={async (values) => onUpdateMoney(Number(values.amount))}>
              <Form.Item name='amount' label='Cập nhật tiền ví web' rules={[{ required: true, message: 'Nhập số tiền' }]}>
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
              <Button htmlType='submit' type='primary' loading={actionLoading} disabled={disabled}>
                Cập nhật tiền
              </Button>
            </Form>

            <Form
              form={walletForm}
              layout='inline'
              initialValues={{ status: true }}
              onFinish={async (values) => onUpdateWalletStatus(Boolean(values.status))}
              style={{ marginTop: 12 }}
            >
              <Form.Item name='status' label='Trạng thái ví' valuePropName='checked'>
                <Switch checkedChildren='Mở' unCheckedChildren='Khóa' />
              </Form.Item>
              <Form.Item>
                <Button htmlType='submit' loading={actionLoading} disabled={disabled}>
                  Áp dụng
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default UserActionPanel;
