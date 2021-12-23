/*
 * @Author: your name
 * @Date: 2021-12-04 19:07:12
 * @LastEditTime: 2021-12-20 10:59:40
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /zhujiayun-website-manage/src/store/index.ts
 */
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "connected-react-router";
import { createHashHistory } from "history";
import createRootReducer from "~reducers/index";
import logger from "redux-logger";
import rootSaga from "~sagas/index";

export const history = createHashHistory();
// 引入工具插件
const { composeWithDevTools } = require("redux-devtools-extension");
const sagaMiddleware = createSagaMiddleware();

const middleWare: any[] = [routerMiddleware(history), sagaMiddleware];

//开发环境下启用日志输出redux state
// if (process.env.NODE_ENV === "development") {
//   middleWare.push(logger);
// }

export const store: any = createStore(
  createRootReducer(history),
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default function getStore() {
  sagaMiddleware.run(rootSaga);
  return store;
}
