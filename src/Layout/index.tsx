/*
 * @Author: your name
 * @Date: 2021-12-17 17:32:08
 * @LastEditTime: 2021-12-20 11:02:17
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /zhujiayun-website-manage/src/Layout/index.tsx
 */
import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Layout, Breadcrumb } from 'antd';
import SliderMenu from './SliderMenu/index';
import menuData from './SliderMenu/menuData';
import RoutesConfig from '~routes/index';
import SystemSetting from './SystemSetting';
import { Link, useHistory, useParams, useLocation } from 'react-router-dom';
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
} from '@ant-design/icons';

import Style from './index.less';
import { SAVE_SLIDER_MENU_DATA } from '~/reducers/common';

const { Header, Content } = Layout;

function AppLayout(props: any) {
	const params = useParams<any>()
	const history = useHistory<any>()
	const [collapsed, setCollapsed] = useState(false)
	const [id, setId] = useState<any>()
	const { pathname } = useLocation();

	const dispatch = useDispatch()
	function toggle() {
		setCollapsed(!collapsed);
	}
	useEffect(() => {
		props.dispatch({ type: SAVE_SLIDER_MENU_DATA, data: menuData });
	}, [pathname])
	return (
		<Layout style={{ minHeight: '100vh' }}>
			{/* 侧边栏菜单 */}
			<SliderMenu collapsed={collapsed} />
			<Layout className={Style['site-layout']}>
				<Header className={Style['site-layout-background']} style={{ padding: 0, display: 'flex', alignItems: 'center', paddingRight: 16 }}>
					{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
						className: Style.trigger,
						onClick: toggle,
					})}
					<div style={{ flex: 1, fontSize: 20 }}>{id ? props.title : null}</div>
					{/* 用户退出系统，修改密码设置 */}
					<SystemSetting />
				</Header>
				<div style={{ padding: 16, fontSize: 14, display: 'flex', justifyContent: 'space-between' }}>
					{/* 面包屑导航 */}
					<Breadcrumb>
						{
							props.breadcrumb.map((item: string | { path: string, name: string }) => {
								return (
									<Breadcrumb.Item key={typeof item === 'string' ? item : item.name}>
										{typeof item === 'string' ? item : <Link to={item.path}>{item.name}</Link>}
									</Breadcrumb.Item>
								)
							})
						}
					</Breadcrumb>
				</div>
				<Content
					className={Style['site-layout-background']}
					style={{
						margin: '0 16px 24px 16px',
						padding: 32,
						minHeight: 280,
					}}
				>
					<RoutesConfig />
				</Content>
			</Layout>
		</Layout>
	)
}

export default connect((state: any) => {
	const { breadcrumb, title } = state.common;
	return {
		breadcrumb,
		title,
		userType: state.common.loginInfo.userType,
	}
})(AppLayout)



