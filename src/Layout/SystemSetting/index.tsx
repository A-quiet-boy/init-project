import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Menu, Modal, Form, Input } from 'antd';
import { INIT_STATE } from '~reducers/common';
import { store } from '~store';
import { push } from 'connected-react-router';

import {
	DownOutlined,
	QuestionCircleOutlined
} from '@ant-design/icons';
import apiList from '~/apis';

//用户退出系统，修改密码设置
const SystemSetting = ({ loginInfo }: any) => {
	const [visible, setVisible] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [form] = Form.useForm();

	function showModalHandle() {
		setVisible(true);
	}

	function logoutHandle() {
		Modal.confirm({
			title: '您确定要退出？',
			icon: <QuestionCircleOutlined />,
			async onOk() {
				await apiList.getlogout()
				store.dispatch({ type: INIT_STATE });
				push('/login')
				localStorage.clear()
			}
		})
	}

	useEffect(() => {
		setVisible(visible);
	}, [visible]);

	useEffect(() => {
		setSubmitting(submitting);
	}, [submitting])

	const menu = (
		<Menu>
			<Menu.Item onClick={showModalHandle}>
				<span style={{ padding: '0 32px 0 8px' }} >修改密码</span>
			</Menu.Item>
			<Menu.Item onClick={logoutHandle}>
				<span style={{ padding: '0 32px 0 8px' }} >退出系统</span>
			</Menu.Item>
		</Menu>
	);

	function cancelHandle() {
		setVisible(false)
	}
	function okHandle() {
		form.validateFields().then(async (values) => {
			setSubmitting(true);
			try {
				await apiList.updatePassword(values)
				form.resetFields()
				store.dispatch({ type: INIT_STATE });
				push('/login')

			} finally {
				setSubmitting(false);
			}
		})
	}

	function validateToNextPassword(rule: any, value: any, callback: any) {
		const newPasswordAgain = form.getFieldValue('newPasswordAgain');
		const newPassword = value;
		const oldPassword = form.getFieldValue('oldPassword');

		if (newPasswordAgain && newPassword) {
			console.log('两次密码不一致')
			if (newPasswordAgain != newPassword) {
				console.log('两次密码不一致')
				return Promise.reject('两次密码不一致')
			}
		}

		if (oldPassword && newPassword) {
			if (oldPassword === newPassword) {
				return Promise.reject('新密码不能跟原密码一样')
			}
		}
		return Promise.resolve();
	};

	function validateToPasswordAgain(rule: any, value: any, callback: any) {

		const newPasswordAgain = value;
		const newPassword = form.getFieldValue('newPassword');

		if (newPasswordAgain && newPassword) {
			console.log('两次密码不一致')
			if (newPasswordAgain != newPassword) {
				console.log('两次密码不一致')
				return Promise.reject('两次密码不一致')
			}
		}

		return Promise.resolve();
	};
	const layout = {
		labelCol: { span: 4 },
		wrapperCol: { span: 16 },
	};

	return (
		<>
			<Dropdown overlay={menu} >
				<span style={{ "cursor": "pointer" }}>{loginInfo.accountName}  <DownOutlined /></span>
			</Dropdown>

			<Modal
				title="修改密码"
				visible={visible}
				confirmLoading={submitting}
				onCancel={cancelHandle}
				onOk={okHandle}
			>
				<Form form={form} {...layout}>
					<Form.Item
						label="原 密 码"
						name="prevPassword"
						rules={[
							{ required: true, message: '请输入原密码' },
							{ max: 20, message: '最多20个字符' },
							{ pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\w]{8,}$/, message: '密码至少8个字符，且必须包含字母和数字' }
						]}
					>
						<Input placeholder="请输入原密码" />
					</Form.Item>

					<Form.Item
						label="新 密 码"
						name="newPassword"
						rules={[
							{ required: true, message: '请输入新密码' },
							{ max: 20, message: '最多20个字符' },
							{ pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\w]{8,}$/, message: '密码至少8个字符，且必须包含字母和数字' },
							{ validator: validateToNextPassword }
						]}
					>
						<Input placeholder="请输入新密码" />
					</Form.Item>

					<Form.Item
						label="确认密码"
						name="newPasswordAgain"
						rules={[
							{ required: true, message: '请再次确认密码' },
							{ validator: validateToPasswordAgain }
						]}
					>
						<Input placeholder="请确认密码" />
					</Form.Item>
				</Form>
			</Modal>
		</>
	)
}
export default connect((state: any) => {
	const { loginInfo } = state.common;
	return {
		loginInfo
	}
})(SystemSetting)