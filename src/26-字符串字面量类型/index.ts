/**
 * 字符串字面量类型
 *  与 es6 模版字符串`${表达式}`
 */
namespace B26 {
  let name = 'lantian';
  let str1 = `${name}喜欢你`;
  let str2 = name + '喜欢你';

  // 1. 简单用法
  type T0 = 'lantian';
  type T1 = `${T0}喜欢你`;

  // 2. 联合类型用法, 联合类型是乘积关系
  type T2 = 'lantian' | '蓝天';
  type T3 = `${T2}喜欢你`; // "lantian喜欢你" | "蓝天喜欢你"
  type Age = 11 | 12;
  type T4 = `${T2}-${Age}`;

  // 3. 泛型用法
  type T5<T extends string> = `${T}喜欢你`;
  type T6 = T5<'lantian'>;

  type T7<T> = `${Extract<T, string>}喜欢你`;
  type T8 = T7<'蓝天'|Age|'lantian'>;

  // 4. 映射类型
  interface Person {
    name: string;
    age: number;
  }
  interface Json {
    [props: string]: any
  }

  // 5. 变换接口数据类型和键名约束
  type T9 = {
    // as 修改键名，通过 in 操作符进行映射
    // Capitalize 首字母大写
    [P in keyof Person as `get${Capitalize<P>}`]: () => Person[P]
  }

  // 6. infer 使用，提取字符串
  type T10 = 'lantian喜欢你' | '蓝天喜欢你';
  type T11<T> = T extends `${infer R}喜欢你` ? R : never;
  type T12 = T11<T10>;


}