/*
 * @Author: your name
 * @Date: 2021-12-04 19:07:12
 * @LastEditTime: 2021-12-20 10:59:31
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /zhujiayun-website-manage/src/sagas/common.ts
 */
import {
  call,
  put,
  takeEvery,
  takeLatest,
  all,
  fork,
} from "redux-saga/effects";
import AxiosRequest from "~utils/request";
import {
  SAVE_LOGIN_INFO,
  FETCH_REFRESH_TOKEN,
  GET_QI_NIU_TOKEN,
} from "~reducers/common";

const post = new AxiosRequest().post;

//刷新token接口
function* refreshToken() {
  yield takeEvery(
    FETCH_REFRESH_TOKEN,
    function* ({ payload, resolve, reject }: any) {
      try {
        const response: GobalsResponse = yield call(
          post,
          "/mgt/user/refresh-token",
          payload
        );
        yield put({ type: SAVE_LOGIN_INFO, data: response.data });
        resolve && resolve(response.data);
      } catch (error) {
        reject && reject(error);
      }
    }
  );
}

//获取七牛token
function* getQiniuUploadToken() {
  yield takeEvery(
    GET_QI_NIU_TOKEN,
    function* ({ payload, resolve, reject }: any) {
      try {
        const response: GobalsResponse = yield call(
          post,
          "/api/common/qiniu_token",
          payload
        );
        resolve && resolve(response.data);
      } catch (error) {
        reject && reject(error);
      }
    }
  );
}
export default function* commonFLow() {
  yield all([fork(refreshToken), fork(getQiniuUploadToken)]);
}
