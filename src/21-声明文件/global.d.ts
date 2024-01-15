/**
 * 全局声明，interface、type 关键字不需要使用 declare全局声明
 */
declare let str1: string;

declare enum Sex {
  Man,
  Woman
}

declare function getName(){}

declare class Cat{}

declare let arr: Array<number> = [ 1, 2, 3 ];

// 不需要使用 declare
interface Type {
  name: string;
  age: number;
}
type Type1 = {
  time: number
}

