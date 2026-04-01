import React, { useState } from 'react';
import { Form, Input, Button, message, Checkbox } from 'antd';
import { history } from 'umi';

import { adminlogin } from '@/services/base/api';
import { useModel } from 'umi';
import logo1 from '@/assets/logo1.png';
import logo2 from '@/assets/logo2.png';
import bg from '@/assets/bg.png';

const Login: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const { initialState, setInitialState } = useModel('@@initialState');

	const handleLogin = async (values: { username: string; password: string }) => {
		try {
			setLoading(true);

			const res = await adminlogin(values);

			if (res?.data?.sessionId) {
				localStorage.setItem('sessionId', res.data.sessionId);

				setInitialState({
					...initialState,
					permissionLoading: false,
				});

				message.success('Đăng nhập thành công');
				history.push('/user/otp');
			}
		} catch (err) {
			message.error('Đăng nhập thất bại');
		}

		setLoading(false);
	};

	return (
		<div
			style={{
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundImage: `url(${bg})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			<div
				style={{
					background: '#fff',
					padding: '40px 48px',
					borderRadius: '4px',
					width: '100%',
					maxWidth: '700px',
					boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 44 }}>
					<img src={logo1} alt="Logo HDG" style={{ height: '90px', width: '90px', objectFit: 'cover', marginRight: '16px', borderRadius: '2px' }} />
					{/* <img src={logo2} alt="Logo NRO" style={{ height: '90px', width: '90px', objectFit: 'cover', marginRight: '24px', borderRadius: '2px' }} /> */}
					<div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '15px' }}>
						<div style={{ fontWeight: 700, color: '#cc0000', fontSize: '24px', letterSpacing: '0.5px', marginBottom: '8px' }}>
							CÔNG TY CỔ PHẦN GIẢI TRÍ HDG
						</div>
						<div style={{ fontWeight: 500, color: '#004aad', fontSize: '16px', lineHeight: 1.4, textAlign: 'center' }}>
							ĐƠN VỊ PHÁT TRIỂN VÀ VẬN HÀNH GAME<br />NGỌC RỒNG ONLINE HÀNG ĐẦU VIỆT NAM
						</div>
					</div>
				</div>

				<Form onFinish={handleLogin} layout="vertical" size="large">
					<Form.Item name="username" rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập hoặc email' }]}>
						<Input placeholder="Tên đăng nhập hoặc email" />
					</Form.Item>

					<Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
						<Input.Password placeholder="Mật khẩu" />
					</Form.Item>

					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
						<Form.Item name="remember" valuePropName="checked" noStyle>
							<Checkbox>Remember me</Checkbox>
						</Form.Item>
						<a href="#" style={{ fontSize: 13 }}>Forgot Password?</a>
					</div>

					<Button type="primary" htmlType="submit" block loading={loading} style={{ height: 44, fontSize: 16, background: '#0b3ba7', borderColor: '#0b3ba7' }}>
						Đăng nhập
					</Button>
				</Form>

				{/* <div style={{ textAlign: 'center', marginTop: 32, fontSize: 13.5 }}>
					<span>New user? <a href="#">Register</a></span>
				</div> */}
			</div>
		</div>
	);
};

export default Login;