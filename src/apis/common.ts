/*
 * @Author: your name
 * @Date: 2021-10-23 09:09:41
 * @LastEditTime: 2021-12-20 10:43:22
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /Offline-Intelligent-Opening/src/apis/common.ts
 */
/***@exports 验证码 */
export const getCodeUrl = "/mgt/user/graph-validate-code";
/***@exports 退出 */
export const getlogout = "/mgt/user/logout";
/***@exports 登陆 */
export const getLoginInfo = "/mgt/user/login";
/***@exports 修改密码 */
export const updatePassword = "/mgt/user/pwd/update";
/***@exports 获取权限 */
export const getPermissions = "/mgt/user/permissions";
/***@exports 刷新token接口 */
export const refreshToken = "/mgt/user/refresh-token";
/***@exports 获取七牛token */
export const getQiniuUploadToken = "/api/common/qiniu_token";
