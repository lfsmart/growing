/**
 * 1. object 引用类型数据类型，数组、函数、对象，通过 new 操作符的 Number/String/Boolean/Date 等
 * 2. Object 构造函数 String/Number/Boolean 等注解时，可以约束字面量、实例对象语法。
 *    如果注解为 Object 类型，实例、字面量都可以被 Object 约束, 
 *    只要是构造出来的数据都可以被 Object 约束，因为 js 所有的对象均继承 Object 对象，
 *    但不能约束 null、undefined
 */
namespace B4 {

  // 1. object 引用类型数据类型，数组、函数、对象
  let o1: object = [];
  o1 = {};
  o1 = Object.create(null);
  o1 = () => {}
  o1 = new Number(1);
  o1 = new String('1');
  o1 = new Boolean(0);
  o1 = new Date();
  o1 = new RegExp('\n');

  // 2. Object 只要是构造出来的数据都可以被 Object 约束
  let str1: String = ''; // 字面量语法
  let str2: String = new String(''); // 实例对象语法
  // let str3: string = new String(''); “string”是基元，但“String”是包装对象。尽可能使用“string”。

  let o2: Object = 123;
  o2 = new Object();
  o2 = new String( '' );
  o2 = true
  o2 = Symbol( '1' );
  // o2 = null
  // o2 = undefined

  type T0<T> = T extends object ? number : boolean;
  
  function AA<T extends object>(obj: T){

  }

}
