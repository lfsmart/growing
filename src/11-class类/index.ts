/**
 * class 类
 * 1. 类的定义
 * 2. 类的继承 extends
 *  (1) extends: 子类继承父类的关键字
 *  (2) super: 必须在子类的 constructor 函数第一行调用，执行父类的 constructor 方法
 * 3. 修饰符
 *  (1) public：默认修饰符，在构造函数参数中使用，相当于在类中直接定义属性值
 *  (2) private: 在 class 可以访问，实例和子类不能访问
 *  (3) protected: 只能在类和子类中使用，实例不能访问
 *  (4) static: 静态属性或方法，只有类本身才能访问
 * 4. 抽象类 作为基类不能实例化，只能被其他类继承
 * 5. 接口和类， 实现接口 implements 关键字实现接口，或者通过 implements 约束类
 * 6. 函数重载和类与函数重载一致
 */
namespace B11 {

  // 1. 类的定义
  class Cat{
    name!: string;
    constructor(name: string){
      this.name = name
    }
    sayHi(){
      console.log( 'Hi' );
    }
  }
  let c1: Cat = new Cat('lantian');
  console.log( c1.name );

  // 2. 类的继承
  class Animal {
    name: string = '动物';
    constructor(name: string){
      this.name = name;
    }
    sayHi(){
      console.log( 'hi' );
    }
  }
  class Dog extends Animal {
    age: string;
    constructor(name: string, age: string){
      super( name ); // 必须在第一行调用，执行父类的 constructor 方法
      this.age = age;
    }
  }
  let d1 = new Dog('lantian', '15' );
  // d1.name
  // d1.age
  // d1.sayHi()

  // 3. 修饰符
  class Man {

    // 默认是加上了 public 
    public name: string = 'lantian';
    
    private age: number = 10;

    static sex: string = '男'

    constructor(public num: number){
      this.num = num;
    }
  }

  // 4. 抽象类 作为基类
  abstract class Woman {
    sayHi(){}
  }
  class Person extends Woman{}
  const p = new Person()
  p.sayHi();
  // const woman = new Woman();

  // 5. 接口和类
  interface I1 {
    name: string;
    hi(name: string): void
  }
  class C1 implements I1 {
    name: string = 'lantian';
    hi(){}
    sayHi(){}
  }

  // 6. 函数重载和类
  class C2 {
    // 重载签名
    fn(): void;
    fn(): number;
    // 实现签名
    fn(){
      return 10
    }
  }
  const c2 = new C2();
  c2.fn()
}

