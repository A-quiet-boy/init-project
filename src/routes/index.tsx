/*
 * @Author: your name
 * @Date: 2021-12-04 19:07:12
 * @LastEditTime: 2021-12-20 10:59:22
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /zhujiayun-website-manage/src/routes/index.tsx
 */
import React, { lazy, Suspense } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import { Spin } from 'antd';
import routes from './routeData';

export const routeData = routes;

export default () => {
  return (
    <Suspense fallback={<Spin size="large"><div></div></Spin>}>
      <Switch>
        {
          routeData.map((route: any, i) => {
            return (
              route.redirect ?
                <Redirect
                  key={i}
                  from={route.from}
                  to={route.redirect}
                  exact={route.exact}
                  strict={route.strict}
                />
                :
                <Route
                  key={i}
                  path={route.path}
                  exact={route.exact}
                  strict={route.strict}
                  render={props => (
                    <route.component {...props} />
                  )}
                />
            );
          })
        }
      </Switch>
    </Suspense>
  )
}