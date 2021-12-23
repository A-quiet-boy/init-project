/*
 * @Author: your name
 * @Date: 2021-12-10 16:22:35
 * @LastEditTime: 2021-12-20 10:55:52
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /Offline-Intelligent-Opening/src/Layout/SiderMenu/menuData.ts
 */
import { bankOutlined, databaseOutlined } from "../icon";
const menuData: SideMenuItemList = [
  {
    title: "项目管理",
    path: "/projectManagement",
    icon: databaseOutlined,
    selected: "项目管理",
    permission: "item-mgt",
  },
  {
    title: "企业管理",
    path: "/firmManagement",
    icon: bankOutlined,
    selected: "企业管理",
    permission: "company-mgt",
  },
];

export default menuData;
