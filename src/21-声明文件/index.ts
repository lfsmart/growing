/**
 * 声明文件
 *  声明文件 xx.d.ts 声明类型 不做实现
 *  1. declare var 声明全局变量
 *  2. declare function 声明全局方法
 *  3. declare class 声明全局类
 *  4. declare enum 声明全局枚举类型
 *  5. declare namespace 声明 (含有子属性的) 全局对象
 *  6. interface 和 type 声明全局类型
 *  7. export 导出变量
 *  8. export namespace 导出 (含有子属性的) 对象
 *  9. export default ES6 默认导出
 *  10. export = commonjs 导出模块
 *  11. export as namespace UMD 库声明全局变量
 *  12. declare global 扩全局变量 
 *  13. declare module 扩展模块
 *  14. /// <reference /> 三斜线指令
 *  15. 如果安装的依赖没自带声明文件 可以安装其自己的@types 声明文件
 *  16. @types 统一管理第三方库的声明文件 能被自动解析
 * 
 *  说明：在 xx.d.ts 中声明的是全局属性，不能使用 export 或 import，如果使用了则就 xx.d.ts 就变成了局部模块，
 *      和其他模块引入和导出一样，需要单独引入类型才能使用，在导入 xx.d.ts 文件时仅需要文件名即可。
 *  17. 引入第三方库
 *    (1) 有声明文件 如 axios, 可以直接引入使用
 *    (2) 没有声明文件 如 lodash, 不可以直接引入， 需要安装声明文件，如果没有声明文件则需要手动声明，手动声明新建 lodash.d.ts
 */
import type { Cat } from './local';
import axios, { CustomType, AxiosRequestConfig } from 'axios';
import * as _ from 'lodash';

namespace B21 {

  // 1. 在 global.d.ts 中已经声明
  str1 = 'lantian';
  Sex[0];
  console.log( Sex[0] )
  getName();
  arr = [];
  const type: Type = {
    name: 'lantian',
    age: 11
  }

  const type1: Type1 = {
    time: 1
  }

  // 2. local.d.ts
  const str2: Cat = {
    name: 'lantian'
  }

  // 3. 第三方模块 有声明文件 axios
  const instance = axios.create({
    baseURL: './',
    isUpload: true, // 自定义属性
  });

  const va: CustomType = {
    name: 'lantian'
  }


  // 4. 第三方库 没有声明文件 lodash 
  //  没有声明文件 建议安装 npm i --save-dev @types/lodash
  // 没有 @types/lodash 文件手动声明模块

  _.cloneDeep({})








}

