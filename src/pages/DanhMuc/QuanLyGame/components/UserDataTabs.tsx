import { Card, Empty, Tabs, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { DiscipleRecord, GameItemRecord, WalletInfo } from '../types';

interface UserDataTabsProps {
  loading?: boolean;
  itemWeb: GameItemRecord[];
  userItems: GameItemRecord[];
  disciples: DiscipleRecord[];
  wallet?: WalletInfo | null;
}

const buildColumns = (data: Record<string, unknown>[]): ColumnsType<Record<string, unknown>> => {
  const first = data?.[0] || {};
  const keys = Object.keys(first);

  if (!keys.length) {
    return [
      {
        title: 'Dữ liệu',
        dataIndex: 'empty',
        render: () => '-',
      },
    ];
  }

  return keys.slice(0, 8).map((key) => ({
    title: key,
    dataIndex: key,
    ellipsis: true,
    render: (value: unknown) => {
      if (typeof value === 'object' && value !== null) {
        return JSON.stringify(value);
      }
      return String(value ?? '-');
    },
  }));
};

const UserDataTabs = ({ loading, itemWeb, userItems, disciples, wallet }: UserDataTabsProps) => {
  const renderSmartTable = (data: Record<string, unknown>[]) => {
    if (!data.length) {
      return <Empty description='Chưa có dữ liệu' />;
    }

    return (
      <Table
        rowKey={(record, index) => String(record.id ?? record.itemId ?? index)}
        columns={buildColumns(data)}
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: 8, showSizeChanger: true }}
        scroll={{ x: 980 }}
      />
    );
  };

  return (
    <Card style={{ marginBottom: 16 }}>
      <Tabs
        items={[
          {
            key: 'item-web',
            label: 'Item Web',
            children: renderSmartTable(itemWeb as Record<string, unknown>[]),
          },
          {
            key: 'all-item',
            label: 'Toàn bộ item user',
            children: renderSmartTable(userItems as Record<string, unknown>[]),
          },
          {
            key: 'de-tu',
            label: 'Đệ tử',
            children: renderSmartTable(disciples as Record<string, unknown>[]),
          },
          {
            key: 'wallet',
            label: 'Thông tin ví',
            children: wallet ? (
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{JSON.stringify(wallet, null, 2)}</pre>
            ) : (
              <Typography.Text type='secondary'>Chưa có dữ liệu ví</Typography.Text>
            ),
          },
        ]}
      />
    </Card>
  );
};

export default UserDataTabs;
