/*
 * @Author: your name
 * @Date: 2021-12-06 11:34:07
 * @LastEditTime: 2021-12-06 13:25:31
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /Offline-Intelligent-Opening/src/utils/rxEvent.ts
 */
import { Subject } from "rxjs";

const toPublicRoomSearch$ = new Subject();
const toPublicStallSearch$ = new Subject();


export { 
  toPublicRoomSearch$,
  toPublicStallSearch$,
};
