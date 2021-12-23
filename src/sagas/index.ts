/*
 * @Author: your name
 * @Date: 2021-12-04 19:07:12
 * @LastEditTime: 2021-12-20 10:59:35
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /zhujiayun-website-manage/src/sagas/index.ts
 */
import { all, fork } from "redux-saga/effects";

const context = require.context("./", true, /(\.js)|(\.ts)$/);
const keys = context
  .keys()
  .filter((item: string) => item !== "./index.js" && item !== "./index.ts");
const sagas = [];

for (let i = 0; i < keys.length; i += 1) {
  sagas.push(context(keys[i]).default);
}

const sagasForks = sagas.map((saga) => fork(saga));

export default function* rootSaga() {
  yield all(sagasForks);
}
