/**
 * 映射类型，循环 key 得到所需的类型
 * 1. 通过 for-in 语法 { [P in keyof T]: T[P] }
 * 2. 循环遍历，将类型设置为统一的数据类型
 * 3. 拷贝 Person 接口数据类型，{ [P in keyof T]: T[P] }
 * 4. 使用 ?修改可选类型，{ [P in keyof T]?: T[P] }
 * 5. -? 将可选属性设置必选，{ [P in keyof T]-?: T[P] }
 * 6. readonly，设置只读属性，{ readonly [ P in keyof T ]-?: T[P] }
 * 7. -readonly， 去除 readonly, { -readonly [ P in keyof T ]-?: T[P] }
 */
namespace B15 {

  type Person = {
    readonly name: string;
    age?: number;
  }

  // 1. 循环遍历，将类型设置为统一的数据类型
  type T0 = {
    [P in keyof Person]: string;
  }

  // 2. 拷贝 Person 接口数据类型
  type T1 = {
    [P in keyof Person]: Person[P];
  }

  // 3. 使用 ?修改可选类型
  type T2 = {
    [P in keyof Person]?: Person[P];
  }

  // 4. -? 将可选属性设置必选
  type T3 = {
    [P in keyof Person]-?: Person[P];
  }

  // 5. 设置只读属性
  type T4 = {
    readonly [P in keyof Person]: Person[P];
  }
  // 6. 删除只读属性
  type T5 = {
    -readonly [P in keyof Person]: Person[P] 
  }

  // 7. 使用泛型, 接口拷贝
  type Copy<T> = {
    [P in keyof T]: T[P];
  }
  type T6 = Copy<Person>;






}

