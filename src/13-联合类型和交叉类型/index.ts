/**
 * 联合类型和交叉类型
 * 1. 联合类型  求并集，| 两边满足一边即可
 * 2. 交叉类型， 取交集, 需要满足 & 两边的数据类型
 * 3. 接口、类型别名、联合类型和交叉类型混用
 */
namespace B13 {

  // 1. 联合类型, 取并集，两边满足一边即可
  type T0 = string | number;
  type T1 = number | boolean;
  type T2 = T0 | T1;
  let a1: T0 = 'lantian';
  a1 = 100;

  // 2. 交叉类型， 取交集, 需要同时满足&两边的数据类型
  type T3 = T0 & T1;
  interface A {
    name: string;
  }
  interface B {
    age: number;
  }
  type T4 = A & B;
  const c1: T4 = {
    name: '',
    age: 18
  }

  // 3. 类型别名与交叉类型
  type D = {
    name: string;
  }
  type E = D & {
    age: number;
  }
  const el: E = {
    name: '',
    age: 15
  }

  // 4. 接口与交叉类型





}

