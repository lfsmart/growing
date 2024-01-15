
import * as axios from 'axios'
// 声明第三方模块
declare module 'axios' {

  // 给第三方模块增加接口
  interface CustomType {
    name: string;
  }
  // 为 axios 内置接口 AxiosRequestConfig 新增属性 isUpload 约束
  // interface 重名会合并参数
  interface AxiosRequestConfig {
    isUpload?: boolean
  }
}

// 必须使用全局声明方式
// declare module 'lodash';
