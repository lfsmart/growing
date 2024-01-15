/**
 * 接口: interface
 * 1. 必选参数约束
 * 2. 可选参数 ?
 * 3. 只读属性 readonly
 * 4. 额外属性 [prop: string]: unknown
 * 5. 继承 extends，继承后拥有父类所有的数据类型
 * 6. 接口重名，合并所有数据类型，与 extends 类似
 *  
 */
namespace B8 {

  interface Person {
    name: string;
    age: number;
  }
  let p1: Person = {
    name: 'lantian',
    age: 11
  };

  // 2. 可选参数
  interface Person2 {
    name: string;
    age?: number;
  }

  // 3. 只读属性, 不允许操作
  interface Person3 {
    readonly name: string;
    readonly age?: number;
  }

  // 4. 额外属性
  interface Person4 {
    name: string;
    age: number;
    [prop: string]: unknown;  // 会约束所有的属性类型
  }
  let p4: Person4 = {
    name: '',
    age: 18,
    address: ''
  }

  // 5. 接口的继承
  interface Animal {
    name: string;
  }
  interface Cat extends Animal {
    age: number;
  }
  let cat: Cat = {
    name: 'cat',
    age: 18
  }

  // 6. 接口重名，合并所有数据类型
  interface Dog1 {
    name: string;
  }
  interface Dog1 {
    age: number;
  }
  const d1: Dog1 = {
    name: 'dog',
    age: 10
  }
  
}

