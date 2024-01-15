/**
 * ts 中的基础类型
 */
namespace B1 {
  //1. 类型注解
  // 字符串类型
  let str: string = 'lantian';

  // 数字类型
  let num1: number = 20;
  let num2: number = NaN;
  let num3: number = Infinity;
  let num4: number = 0xffff;

  // 布尔值
  let b1: boolean = true;
  let b2: boolean = false;

  // undefined， 无法赋值
  let undef: undefined = undefined;

  // null，无法赋值
  let nu: null = null;

  let sy: symbol = Symbol( 'hi' );
}
