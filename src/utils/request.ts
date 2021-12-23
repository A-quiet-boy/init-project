import axios, { Canceler, AxiosInstance, AxiosResponse } from 'axios';
import { INIT_STATE, FETCH_REFRESH_TOKEN, SAVE_LAST_FETCHED_TIME } from '~reducers/common';
import { message } from 'antd';
const appKey = "";
import { store } from '~store';
import { push } from 'connected-react-router';
import { dispatchWithPromise } from '~utils/util';
import DefaultConfig from '../config.default'
const cancelToken = axios.CancelToken;

export const baseURL = BASE_URL;

//token最长有效时效两个小时，单位秒
const maxExpiresIn = DefaultConfig.loginPermissions.maxExpiresIn

//过滤特定的接口地址，以下路径不进入重复取消队列
const API_whiteList: string[] = DefaultConfig.request.common.whiteList


//特定的code状态码(code!=1)执行的操作
const specifyCodeHandles: any = {
    //登录过期的情况下，退出登录
    10006: function () {
        store.dispatch({ type: INIT_STATE });
        store.dispatch(push('/login'));
        localStorage.clear()
    }
}
//特定接口不需要走刷新token接口时机判断
const specifyApiInOutOfRefreshingCode = [
    '/mgt/user/refresh-token'
]


export default class AxiosRequest {

    axiosInstance: AxiosInstance
    post: (url: string, data?: any, config?: any | undefined) => Promise<AxiosResponse<any>>;
    options: any

    axiosConfig = {
        baseURL,
        withCredentials: true
    }


    constructor(options?: any) {
        this.axiosInstance = axios.create(this.axiosConfig);
        this.post = this.axiosInstance.post;
        this.bindInterceptor();
        this.options = options
    }


    pendingList: { u: string, f: Canceler }[] = [];


    commonRequest = async (req: any) => {//定义请求报文
        this.removePending(req);
        req.cancelToken = new cancelToken((c) => {
            if (API_whiteList.indexOf(req.url) == -1) {
                this.pendingList.push({ u: req.url + '&' + req.method, f: c });
            }
        });

        const state = store.getState();
        const { loginInfo, lastFetchedTime } = state.common || {};
        const { tokenType, accessToken, refreshToken } = loginInfo || {};

        req.headers.Authorization = `${tokenType} ${accessToken}`;

        if (lastFetchedTime && loginInfo) {
            const currentTime = new Date().getTime() / 1000;
            const expiresIn = loginInfo.expiresIn;

            if (!specifyApiInOutOfRefreshingCode.includes(req.url)) {
                if (currentTime - (lastFetchedTime / 1000) >= maxExpiresIn) {//超出token保存的最大有效时效就登出
                    store.dispatch({ type: INIT_STATE });
                    store.dispatch(push('/login'));
                    localStorage.clear()
                } else if (currentTime - (lastFetchedTime / 1000) >= expiresIn) {//达到过期时效就刷新当前token
                    const result: any = await dispatchWithPromise({ type: FETCH_REFRESH_TOKEN, payload: { refreshToken } });
                    const { tokenType, accessToken } = result;
                    req.headers.Authorization = `${tokenType} ${accessToken}`;
                }
            }

        }

        if (!req.data) req.data = {};
        req.data.appkey = appKey;
        req.data.timestamp = new Date().getTime();

        store.dispatch({ type: SAVE_LAST_FETCHED_TIME, data: new Date().getTime() });

        return req;
    }

    commonResponse = (res: AxiosResponse<ResponseData>) => {//响应报文
        return new Promise((resolve, reject) => {
            this.removePending(res);

            if (res.status != 200) {
                message.destroy();
                message.error('网络异常');
                reject('网络异常');
            }

            const { code } = res.data;
            if (code === 1 || (this.options && this.options.isRaw)) {
                resolve(res.data);
            }  else {
                message.destroy();
                if (res.request.responseType === "blob") {
                    resolve(res.data);
                    return;
                } else {
                    message.error(res.data.message, 1);
                }

                const handler = specifyCodeHandles[code];
                handler && handler(resolve, reject)
                reject(JSON.stringify(res.data));
            }
        })
    }

    removePending = (config: any) => {//取消重复的请求
        for (let p = 0; p < this.pendingList.length; p++) {
            if (this.pendingList[p].u === config.url + '&' + config.method) {
                this.pendingList[p].f();
                this.pendingList.splice(p, 1);
            }
        }
    }

    bindInterceptor = () => {//绑定拦截器
        if (DefaultConfig.request.common.enable) {
            this.axiosInstance.interceptors.request.use((req: any) => {
                return this.commonRequest(req);
            }, (err: any) => {
                return Promise.reject(err)
            });


            this.axiosInstance.interceptors.response.use((res: AxiosResponse): Promise<any> => {
                return this.commonResponse(res);
            }, (err: any) => {
                if (axios.isCancel(err)) {
                    console.info('重复请求已经取消')
                } else {
                    throw new Error(err)
                }
            });
        }
    }

}
