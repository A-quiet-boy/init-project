/*
 * @Author: your name
 * @Date: 2021-12-18 15:57:25
 * @LastEditTime: 2021-12-20 10:22:33
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /zhujiayun-website-manage/src/app.tsx
 */
import React, { Suspense, lazy, useEffect } from 'react';
import getStore, { history } from './store';
import { Provider } from 'react-redux';
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import { Spin, ConfigProvider } from 'antd';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import PrivateComponent from './components/PrivateComponent';
import zhCN from 'antd/es/locale/zh_CN';
import 'antd/dist/antd.less';
const appStore = getStore();
const persistor = persistStore(appStore);
const Login = lazy(() => import('~pages/login'));
const AppLayout = lazy(() => import('~/Layout'));
const NotFound = lazy(() => import('~pages/404'));
import DefaultConfig from './config.default'
import './index.less'
import { setmultiple } from './utils/util';
document.title = DefaultConfig.layout.defaultTitle
window.onresize = function () {
	setmultiple();
}
function App() {
	useEffect(() => {
		setmultiple()
		return
	}, [])
	return (
		<Provider store={appStore}>
			<PersistGate persistor={persistor}>
				<ConfigProvider locale={zhCN}>
					<ConnectedRouter history={history}>
						<Suspense fallback={<Spin size="large"><div style={{ minHeight: '100vh', minWidth: '100vw' }}></div></Spin>}>
							<Switch>
								<Route path="/404" exact component={NotFound}></Route>
								{
									DefaultConfig.loginPermissions.enable &&
									<Route path="/login" exact component={Login}></Route>
								}
								<PrivateComponent>
									<Route path="/*" exact component={AppLayout}></Route>
								</PrivateComponent>
							</Switch>
						</Suspense>
					</ConnectedRouter>
				</ConfigProvider>
			</PersistGate>
		</Provider>
	)
}

export default App