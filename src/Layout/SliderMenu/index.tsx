import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Layout, Menu } from 'antd';
import { withRouter, matchPath } from 'react-router';
import Style from './index.less';
import Icon from '@ant-design/icons';

const { Sider } = Layout;

const logo = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 48 48">
		<g id="组_1" data-name="组 1" transform="translate(-345 -137)">
			<rect id="矩形_1" data-name="矩形 1" width="48" height="48" rx="8" transform="translate(345 137)" fill="#2f75de" />
			<text id="开" transform="translate(352 173)" fill="#fff" font-size="34" font-family="PingFangSC-Regular, PingFang SC"><tspan x="0" y="0">开</tspan></text>
		</g>
	</svg>
)
interface newSiderMenuItem extends SideMenuItem {
	onClick?: ((event: any) => void) | undefined;
}
function SiderMenu(props: any) {
	const [collapsed, setCollapsed] = useState(props.collapsed);
	const [menuData, setMenuData] = useState(props.menuData);
	const [selectedKeys, setSelectedKeys] = useState<string[] | undefined>([]);
	const [parentSelectedKeys, setParentSelectedKeys] = useState<string[] | undefined>([]);
	function setMenuOpenStatus() {
		const routePath = props.history.location.pathname;
		let parentKeys: string[] = [];
		const selectedKey: string[] = []

		function matchSiderNav(data: any[], isOuter = false): void {
			for (let i = 0; i < data.length; i++) {
				isOuter && (parentKeys = []);
				const { selected, path, children } = data[i];
				const routeItem = matchPath(routePath, { path });
				if (children && children.length) {
					parentKeys.push(selected)
					matchSiderNav(children)
				} else if (routeItem) {
					parentKeys.push(selected)
					selectedKey.push(selected);
					setParentSelectedKeys(parentKeys);
					setSelectedKeys(selectedKey);
					break;
				} else {
					if (i + 1 === data.length) {
						parentKeys.pop();
					}
				}
			}
		}
		matchSiderNav(props.menuData, true);
		if (!parentKeys.length && !selectedKey.length) {
			setParentSelectedKeys(parentKeys);
			setSelectedKeys(selectedKey);
		}
	}

	function permissionStatus(permission: string | undefined) {
		const permissions = props.permissions
		for (let i in permissions) {
			if (permission == permissions[i].key) {
				return true
			}
		}
		return false
	}
	useEffect(() => {
		setMenuOpenStatus()
	}, [props.history.location]);

	useEffect(() => {
		setMenuData(props.menuData);
		setMenuOpenStatus();
	}, [props.menuData]);

	useEffect(() => {
		if (!props.collapsed) {
			setMenuOpenStatus();
		} else {
			setParentSelectedKeys([]);
		}
		setCollapsed(props.collapsed);
	}, [props.collapsed]);


	function unfoldMenuHandle(parentSelectedKeys: any) {
		setParentSelectedKeys(parentSelectedKeys);
	}


	const renderMenu = (menus: SideMenuItemList = []): React.ReactNode => {
		return menus.map((menu: newSiderMenuItem) => {
			if ((menu.permission && !permissionStatus(menu.permission))) {
				return null
			}
			if (menu.children && menu.children.length) {
				return (
					<Menu.SubMenu
						key={menu.selected}
						icon={menu.icon}
						title={
							<span>{menu.title}</span>
						}
					>
						{
							renderMenu(menu.children)
						}
					</Menu.SubMenu>
				)
			}

			return (
				<Menu.Item
					key={menu.selected}
					icon={menu.icon}
					onClick={menu.onClick}
				>
					<Link target={menu.target} to={(menu.path) as string} >
						{menu.title}
					</Link>
				</Menu.Item>
			)
		})
	}
	return (
		<Sider
			collapsible collapsed={!!collapsed}
			trigger={null}
			className={Style.Sider}
		>
			{
				!!collapsed ? <Icon component={logo} style={{ margin: '8px 0 4px 14px' }} />
					: <div className={Style.title} style={{ whiteSpace: 'normal' }}>管理平台</div>
			}

			<Menu
				theme="dark"
				mode="inline"
				openKeys={parentSelectedKeys}
				selectedKeys={selectedKeys}
				onOpenChange={unfoldMenuHandle}
			>
				{
					renderMenu(menuData)
				}
			</Menu>
		</Sider>
	)

}

export default connect((state: any) => {
	return {
		menuData: state.common.sideMenu as SideMenuItemList,
		permissions: state.common.permissions,
	}
})(withRouter(SiderMenu))