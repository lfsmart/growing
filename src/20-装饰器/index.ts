/**
 * 装饰器，新增功能
 * 在 tsconfig 配置文件中 experimentalDecorators， emitDecoratorMetadata 设置为 true
 * 装饰器：
 * 1. 类装饰器，传参和无参装饰器
 * 2. 属性装饰器
 * 3. 方法装饰器
 * 4. 参数装饰器
 */
namespace B20 {

  // 1. 类装饰器函数
  let log1: ClassDecorator = target => {
    target.prototype.name = 'lantian'
  }
  @log1
  class Cat {}
  const c1: any = new Cat();
  console.log( c1.name );

  // 2. 类装饰器传参， 返回一个装饰器函数
  let log2 = (age: number): ClassDecorator => {
    return target => {
      target.prototype.age = age;
    }
  }
  @log1
  @log2(11)
  class Cat2 {}
  const c2: any = new Cat2();
  console.log( c2.age );
  console.log( c2.name );

  // 3. 属性装饰器
  let log3: PropertyDecorator = (target, propKey) => {
    console.log( 'target:', target );
    console.log( 'propKey:', propKey)
  }
  class Dog{
    @log3
    name: string = 'lantian';
    @log3
    age: number = 11
  }

  // 4. 方法装饰器
  let log4: MethodDecorator = (...rest) => {
    /**
     * args[0]: target
     * args[1]: functionName
     * args[2]: 函数属性描述
     * {
        value: [Function: sayHi],
        writable: true,
        enumerable: false,
        configurable: true
       }
     */
    console.log( 'rest: ', rest );
  }
  class Dog4{
    @log4
    sayHi(name: string, age: number){}
  }

  // 5. 参数装饰器
  let log5: ParameterDecorator = (...args) => {
    console.log( 'args:', args );
  }
  class Woman {
    run( @log5 name: string, age: number){}
  }



}

