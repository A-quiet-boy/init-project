/*
 * @Author: your name
 * @Date: 2021-12-20 10:19:54
 * @LastEditTime: 2021-12-20 11:05:40
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /zhujiayun-website-manage/src/reducers/common.ts
 */

export const SAVE_BREADCRUMB = Symbol("RECEIVE_BREADCRUMB");

export const SAVE_SLIDER_MENU_DATA = "SAVE_SLIDER_MENU_DATA";

export const SAVE_CODE_URL = "RECEIVE_CODE_URL";

export const SAVE_LOGIN_INFO = "SAVE_LOGIN";

export const FETCH_LOGIN_INFO = Symbol("REQUEST_LOGIN");

export const SAVE_PERMISSIONS = "SAVE_PERMISSIONS";

export const INIT_STATE = "SAVE_NEWS_SOURCE_TAGS";

export const FETCH_REFRESH_TOKEN = Symbol("FETCH_REFRESH_TOKEN");

export const SAVE_LAST_FETCHED_TIME = Symbol("SAVE_LAST_FETCHED_TIME");

export const GET_QI_NIU_TOKEN = Symbol("GET_QI_NIU_TOKEN");

export const initState = {
  sideMenu: [],
  breadcrumb: [],
  permissions: [],
  qiniuToken: {},
  loginInfo: false,
  title: "管理平台",
};

const common = (state = initState, action: Action) => {
  switch (action.type) {
    case SAVE_BREADCRUMB:
      return {
        ...state,
        breadcrumb: action.data || [],
      };
    case SAVE_SLIDER_MENU_DATA:
      return {
        ...state,
        sideMenu: action.data,
      };
    case SAVE_CODE_URL:
      return {
        ...state,
        ...action.data,
      };
    case SAVE_LOGIN_INFO:
      return {
        ...state,
        loginInfo: action.data,
      };
    case SAVE_PERMISSIONS:
      return {
        ...state,
        permissions: action.data,
      };
    case INIT_STATE:
      return {
        ...initState,
      };
    case SAVE_LAST_FETCHED_TIME:
      return {
        ...state,
        lastFetchedTime: action.data,
      };
    default:
      return state;
  }
};

export default common;
