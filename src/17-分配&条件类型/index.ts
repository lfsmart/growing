/**
 * extends 分配和条件约束
 * 1. A extends B，A 数据类型是否由 B 数据类型继承或扩展而来，是则返回 true, 否则返回 false
 * 2. A extends B，A 由 B 约束，B 约束了 A 的数据类型，仅在满足约束条件返回 true, 否则返回 false
 * 3. 泛型，分配条件类型，如果传入的是联合类型，则分别 extends 判断后再得到所有类型联合起来
 *  (1) T extends U ? T : never 从 T 中过滤出 U 类型
 *  (2) T extends U ? never : T 从 T 中删除 U 类型
 */
namespace B17 {

  // 1. 字面量，条件判断
  type T0 = string extends string | number ? 'x' : 'y'; // B 能约束 A => T0 = 'x'
  type T1 = string | number extends string ? 'x' : 'y'; // B 无法约束 A => T1 = 'y'

  type T2 = 'x' extends 'x' | 'y' ? string : number; // 'x' 是 'x' | 'y' 的子集

  interface A {
    name: string;
  }
  interface B {
    name: string;
    age: number;
  }
  type T3 = A extends B ? 'x' : 'y'; // A 是由 B 继承而来？（B 无法约束 A）

  // 2. 泛型，分配条件类型
  // T extends U ? x : y
  type T4<T> = T extends 'x' ? string : number;
  type T5 = T4<'x' | 'y'>; // string|number, x, y 分别 extends

  type T6<T, U> = T extends U ? T : never;
  type T7 = T6<'a' | 'b' | 'c', 'a'| 'b'>
  /**
   * 如果 A 是联合类型:
   * a extends a | b ? a : never -> a
   * b extends a | b ? b : never -> b
   * c extends a | b ? c : never -> never
   * -> a | b | never -> a | b | never
   * never 类型不存在于联合类型
   */
  type T8<T, U> = T extends U ? never : T;
  type T9 = T8<'a' | 'b' | 'c' , 'a'| 'b' >; // 与 T7 相反


  




}

