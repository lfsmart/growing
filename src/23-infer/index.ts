/**
 * infer 关键字
 *  infer 通过占位 推断类型，必选在条件类型中使用，结果必须在正确判断中
 *  1. 基本类型
 *  2. 获取数组元素类型
 *  3. 获取元组类型
 *  4. 获取函数的返回类型, 内置 ReturnType<typeof fn>
 *  5. 获取函数参数类型，内置 Parameters<typeof fn>
 */
namespace B23 {

  // 1. 基本类型
  type T0<T> = T extends infer U ? U : never;
  type T1 = T0<string>;
  
  // 2. 获取数组元素类型
  type T2<T> = T extends (infer R)[] ? R : never;
  type T3 = T2<number[]>; // number

  // 3. 获取元组类型
  type T4 = T2<[string, number]>; // string | number

  // 4. 获取函数的返回类型, 内置 ReturnType<typeof fn>
  type TReturn<T extends Function> = T extends (...args: any)  => infer U ? U : never;
  function fn(a: string, b: number): number{
    return 20
  }
  type T5 = TReturn<typeof fn>; // 推断函数返回值类型
  type T5_1 = ReturnType<typeof fn>

  // 5. 获取函数参数类型，内置 Parameters<typeof fn>
  type TParams<T extends (...args: any) => any> = T extends (...args: infer U) => any ? U : never;
  type T6 = TParams<typeof fn>; // [a: string, b: number]
  type T7 = Parameters<typeof fn> // [a: string, b: number]

  // 6. 获取实例的类型
  class Cat{
    name?: string = 'lantian'
    sayHi(){}
  }
  type CatInstanceType = InstanceType<typeof Cat>
  const c1: CatInstanceType = {
    sayHi() {}
  }

  // 7. 获取字面量类型的大小写类型
  type Name = 'lantian'
  type T8 = Uppercase<Name>
  type T9 = Lowercase<T8>





  

}