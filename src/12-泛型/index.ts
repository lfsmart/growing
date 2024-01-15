/**
 * 泛型
 * 1. 泛型约束 
 *  (1) 泛型函数，用来约束函数的输入输出，输入与输出的数据类型有关联性
 * 2. 泛型接口 在使用 interface 时定义泛型数据类型
 * 3. 泛型类型别名 在使用 type 时定义泛型数据类型
 */
namespace B12 {

  // 1. 泛型函数
  function fn1<T>(a: T): T{
    return a
  }
  // 传入函数类型约束
  fn1<number>(1);
  fn1<string>('1');
  // 使用类型推论，系统根据传入的参数，自动推断其数据类型
  fn1(1)


  // 2. 泛型接口
  interface Person<T>{
    name: T
  }
  let p1: Person<string> = {
    name: 'lantian',
    // name: 1, // error
  }

  // 3. 泛型类型别名
  type Cat<T> = T | number;
  let c: Cat<string> = ''
  c = 1;

  // 4. 类的泛型
  class Dog<T>{
    name: T;
    constructor(name: T){
      this.name = name;
    }
  }
  let d1: Dog<string> = new Dog( 'lantian' );
  let d2 = new Dog( 1 );
  let d3 = new Dog( true );
}

