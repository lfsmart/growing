/**
 * 内置工具类
 * 1. Partial<T>: 给所有属性加 ? 变成可选项
 * 2. Required<T>: -?，将约束的项去除 ? 变成必选项
 * 3. Readonly<T>: 约束所有项为只读
 * 4. Pick<T, K extends keyof T>，获取指定项的约束
 * 5. Record<K extends keyof any, T>，为 K 指定数据类型
 * 6. Exclude<T,U>=T extends U ? never:T， 从 T 类型中排除 U 类型
 * 7. Extract<T,U>=T extends U ? T:never， 与 Exclude 相反，从 T 中保留 U 类型，删除其他类型
 * 8. Omit<T, K extends any> 从 T 中排除指定键名的类型
 */
namespace B17 {

  interface Person {
    name: string;
    age?: number;
    sex: string;
    readonly address: string;
  }

  // 1. Partial: 给所有属性加 ? 变成可选
  type T0 = Partial<Person>
  // 手动实现 Partial
  type MyPartial<T> = {
    [ P in keyof T]?: T[P]
  }
  type T1 = MyPartial<Person>

  // 2. Required: -?，将约束的项去除 ? 变成必选项
  type T2 = Required<Person>
  type MyRequired<T> = {
    [P in keyof T]-?: T[P]
  }
  type T3 = MyRequired<Person>

  // 3. Readonly，约束所有项为只读
  type T4 = Readonly<Person>
  type MyReadonly<T> = {
    readonly [P in keyof T]: T[P]
  }
  type T5 = MyReadonly<Person>

  // 4. Pick，获取指定项的约束
  type T6 = Pick<Person, 'name' | 'age' >;
  type MyPick<T, K extends keyof T> = {
    [P in K]: T[P]
  }
  type T7 = MyPick<Person, 'age' | 'name'>;

  // 5. Record，为 K 指定数据类型
  type T8 = Record<'name'|'age', Person>;
  type MyRecord<K extends keyof any, T> = {
    [P in K]: T
  }
  type T9 = MyRecord<'name'|'age', Person>;

  // 6. Exclude，从 T 类型中排除 U 类型
  type T10 = Exclude<string|number, number>
  type MyExclude<T, U> = T extends U ? never : T;
  type T11 = MyExclude<string|number, number>

  // 7. Extract，与 Exclude 相反，从 T 中保留 U 类型，删除其他类型
  type T12 = Extract<string|number, number>
  type MyExtract<T, U> = T extends U ? T : never;
  type T13 = MyExtract<string|number, number>;

  // 8. Omit，从 T 中排除指定键名的类型
  type T14 = Omit<Person, 'name' | 'age'>
  type MyOmit<T, K extends any> = Pick<T, Exclude<keyof T, K> >;
  type T15 = MyOmit<Person, 'name'>;

  // 9. 删除readonly
  // type MyReadonly2<T> = {
  //   -readonly [P in keyof T]: T[P]
  // }
  // type T16 = MyReadonly2<Person>
}

