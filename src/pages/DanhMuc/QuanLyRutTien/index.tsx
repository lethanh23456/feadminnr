import { ApproveWithdraw, GetAllWithdrawl, RejectWithdraw } from '@/services/Cashier/api';
import { Card, message, Row, Col, Statistic } from 'antd';
import { useEffect, useState } from 'react';
import TableRutTien from './components/TableRutTien';

const QuanLyRutTien = () => {
	const [data, setData] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const getAccessToken = () => localStorage.getItem('access_token') || '';

	const fetchWithdrawals = async () => {
		try {
			setLoading(true);
			const token = getAccessToken();
			if (!token) {
				message.error('Bạn chưa đăng nhập hoặc token không hợp lệ');
				setData([]);
				return;
			}
			const response = await GetAllWithdrawl(token);

			const responseData = response.data?.withdraws || response.data?.data || response.data;
			if (Array.isArray(responseData)) {
				setData(responseData);
			} else {
				setData([]);
			}
		} catch (error: any) {
			console.error('Lỗi khi lấy danh sách rút tiền:', error);
			message.error(error.response?.data?.message || 'Lỗi lấy danh sách rút tiền');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchWithdrawals();
	}, []);

	const handleApprove = async (record: any) => {
		try {
			setLoading(true);
			const token = getAccessToken();
			if (!token) {
				message.error('Bạn chưa đăng nhập hoặc token không hợp lệ');
				return;
			}
			const response = await ApproveWithdraw(record.id, record.finance_id, token);
			message.success(response.data?.message || 'Duyệt yêu cầu rút tiền thành công!');
			fetchWithdrawals();
		} catch (error: any) {
			console.error('Lỗi duyệt:', error);
			message.error(error.response?.data?.message || 'Duyệt yêu cầu thất bại!');
			setLoading(false);
		}
	};

	const handleReject = async (record: any) => {
		try {
			setLoading(true);
			const token = getAccessToken();
			if (!token) {
				message.error('Bạn chưa đăng nhập hoặc token không hợp lệ');
				return;
			}
			const response = await RejectWithdraw(record.id, record.finance_id, token);
			message.success(response.data?.message || 'Từ chối rút tiền thành công!');
			fetchWithdrawals();
		} catch (error: any) {
			console.error('Lỗi từ chối:', error);
			message.error(error.response?.data?.message || 'Từ chối yêu cầu thất bại!');
			setLoading(false);
		}
	};

	const countPending = data.filter((item) => item.status === 'PENDING').length;
	const countSuccess = data.filter((item) => item.status === 'SUCCESS').length;
	const countError = data.filter((item) => item.status === 'ERROR' || item.status === 'FAILED').length;

	return (
		<div style={{ margin: '24px' }}>
			<Row gutter={16} style={{ marginBottom: 16 }}>
				<Col span={8}>
					<Card bordered={false}>
						<Statistic title="Chờ duyệt" value={countPending} valueStyle={{ color: '#faad14' }} />
					</Card>
				</Col>
				<Col span={8}>
					<Card bordered={false}>
						<Statistic title="Thành công" value={countSuccess} valueStyle={{ color: '#52c41a' }} />
					</Card>
				</Col>
				<Col span={8}>
					<Card bordered={false}>
						<Statistic title="Từ chối / Lỗi" value={countError} valueStyle={{ color: '#ff4d4f' }} />
					</Card>
				</Col>
			</Row>

			<Card title='Quản lý yêu cầu rút tiền' bordered={false}>
				<TableRutTien dataSource={data} loading={loading} onApprove={handleApprove} onReject={handleReject} />
			</Card>
		</div>
	);
};

export default QuanLyRutTien;
