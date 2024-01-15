/**
 * keyof 操作符，获取键名的联合类型(键名的字符串字面量)
 * 1. 获取键名的联合类型(键名的字符串字面量)
 * 2. any keyof 字面量为 string | number | symbol
 */
namespace B14 {

  // 1. 获取键名的联合类型(键名的字符串字面量)
  interface A {
    name: string;
    age: number;
  }
  type T0 = keyof A; // 'name' | 'age'
  let a1: T0 = 'name';
  a1 = 'age';

  // 2. 获取基本类型键名字面量
  type T1 = keyof string;
  type T2 = keyof number;
  type T3 = keyof any; // string | number | symbol

  function getObjProp<T extends object, K extends keyof T>(obj: T, key: K): T[K]{
    return obj[key];
  }
}

