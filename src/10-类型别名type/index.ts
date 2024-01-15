/**
 * 类型别名：type
 * 1. 基本类型
 * 2. 元组类型
 * 3. 数组类型
 * 4. 约束对象, 与 interface 类似 
 * 5. 约束函数类型
 * 6. 类型别名扩展
 * 7. 联合类型
 */
namespace B10 {

  // 1. 基本类型
  type T0 = string;
  // let a1: T0 = 10

  // 2. 元组类型
  type T1 = [string, number];
  let a2: T1 = ['', 0];

  // 3. 数组类型
  type T2 = string[];

  // 4. 约束对象, 与 interface 类似
  type T3 = {
    name: string;
    age: number;
  }
  let p1: T3 = {
    name: 'lantian',
    age: 10
  }

  // 5. 约束函数类型
  type T4 = (a: string, b: number) => void;
  const fn: T4 = (a: string, b: number) => {}

  // 6. 类型别名扩展
  type T5 = {
    name: string;
  }
  type T6 = T5 & {
    age: number;
  }
  const a3: T6 = {
    name: 'lantian',
    age: 18
  }

  // 7. 联合类型
  type T7 = string | number;
  let a4: T7 = 10;
  a4 = '10'



}

