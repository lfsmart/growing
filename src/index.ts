// class MyClass {
//   name: 'MyClass'
//   private getName(){
//     return this.name;
//   }
//   handler(){
//     this.getName();
//     this.getName1();
//   }

//   protected getName1(){
//     return this.name;
//   }
// }

// class A extends MyClass {
//   constructor(){
//     super();
//   }
//   handler(){
//     this.getName();
//     this.getName1();
//     this.handler();
//   }
// }

// protected 在类中使用，不能在实例中
// private 只能在当前类中使用
// public 在类中能使用，实例也能使用

interface This{
  new (): MyClass
}

class MyClass {
  protected name: string = 'lantian';
  getName(){
    return this.name
  }
  static names( this: This ){
    return new this().getName()
  }
}

console.log( MyClass.names() );




