/*
 * @Author: your name
 * @Date: 2021-07-23 15:26:35
 * @LastEditTime: 2021-12-20 10:19:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Offline-Intelligent-Opening/src/routes/routeData.tsx
 */
import React, { lazy } from 'react';
const Welcome = lazy(() => import('~pages/welcome'));
//获取route后缀文件
let configRoute: Array<routesConfigItem> = []
const files = require.context('./', false, /.route.tsx$/)
files.keys().map((key: any) => configRoute = [...configRoute, ...files(key).router])
import DefaultConfig from '../config.default'

export interface routesConfigItem {
  path?: string
  exact?: boolean
  strict?: boolean
  component?: React.ReactNode
  selected?: string
  children?: routesConfigItem[]
  redirect?: string
  from?: string
  to?: string
}

const routes: routesConfigItem[] = [
  ...configRoute,
  {
    from: "/",
    redirect: DefaultConfig.defaultPage,
    exact: true
  },
  {
    path: "/welcome",
    exact: true,
    component: Welcome,
    selected: 'home'
  },
];


export default routes