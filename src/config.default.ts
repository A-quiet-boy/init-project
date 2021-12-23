/*
 * @Author: your name
 * @Date: 2021-12-15 18:25:39
 * @LastEditTime: 2021-12-20 11:05:33
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /zhujiayun-website-manage/src/config.default.ts
 */
const config = {
  //登录权限
  loginPermissions: {
    enable: true, // 开启
    //默认超时时间(秒)
    maxExpiresIn: 2 * 3600,
    whiteList: ["/mgt/gov/user/refresh-token"], //白名单
  },
  //页面权限
  Permissions: {
    enable: true,
    whiteList: [], //白名单
  },
  //接口相关
  request: {
    prefix: {
      // test: 'http://10.0.142.94:15006',
      test: "https://test-xxkpapi.zje.com", //测试前缀
      prod: "https://xxkpapi.zje.com", //正式前缀
    }, //默认前缀
    suffix: "", //默认后缀
    //重复请求
    common: {
      enable: true,
      whiteList: ["/api/common/qiniu_token"], //重复请求白名单
    },
  },
  //端口监听
  listen: {
    path: "",
    port: 3000, //默认端口
    host: "0.0.0.0", // 默认输入locahost 不建议设置 hostname y为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
  },
  //默认页面相关
  layout: {
    defaultTitle: "管理平台",
  },
  //默认页面
  defaultPage: "/welcome",
};
export default config;
