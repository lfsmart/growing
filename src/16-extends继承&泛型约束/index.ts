/**
 * extends 继承和泛型约束
 * 1. 继承
 * 2. 接口扩展，接口继承
 * 3. 泛型约束
 */
namespace B16 {

  // 1. 继承
  class Animal {
    name!: string;
    sayHi(){
     console.log( 'hi' );
    }
  }
  // 子类继承了父类的属性和方法
  class Cat extends Animal {}
  let c1: Cat = new Cat();
  // c1.name
  // c1.sayHi()

  // 2. 接口扩展， 接口扩展
  interface A{
    name: string;
    sayHi(): void;
  }
  interface B extends A {
    age: number
  }
  let b1: B = {
    name: 'lantian',
    age: 18,
    sayHi(){}
  }

  // 3. 泛型约束
  function fn1<T extends string | number >(a: T){
    console.log( a, '---' ); // a 被约束为 string | number
  }
  fn1( '1' );

  function fn2<T extends 'get'|'post'>(a: T){}
  fn2('post')
  fn2('get')

  function fn3<T extends object>(a: T){}
  fn3<number[]>([]);

  function fn4<T extends keyof { name: string }>(a: T){}
  fn4('name');


}

