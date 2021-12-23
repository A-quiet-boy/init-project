/*
 * @Author: your name
 * @Date: 2021-12-04 19:07:12
 * @LastEditTime: 2021-12-20 10:59:17
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /zhujiayun-website-manage/src/reducers/index.ts
 */
import path from "path-browserify";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { connectRouter } from "connected-react-router";

// WHITELIST
export const persistConfig = {
  key: "__info__",
  storage: storage,
  whitelist: ["loginInfo", "lastFetchedTime"],
};

const context = require.context("./", true, /(\.js)|(\.ts)$/);
const keys = context
  .keys()
  .filter((item: string) => item.indexOf("index") === -1);
const reducers: any = {};

keys.forEach((k: string) => {
  const fileBaseName = path.basename(k, path.extname(k));
  reducers[fileBaseName] = context(k).default;
});

const createRootReducer = (history: any) =>
  combineReducers({
    ...reducers,
    common: persistReducer(persistConfig, reducers.common),
    router: connectRouter(history),
  });

export default createRootReducer;
