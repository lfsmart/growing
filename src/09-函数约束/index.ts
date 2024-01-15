/**
 * 函数
 * 1. 函数约束
 * 2. 函数参数约束
 *  (1) 可选参数?
 *  (2) 剩余参数, 与 es6 中的 ... 用法一致
 *  (3) 参数默认值， 与 es6 语法一致
 * 3. 函数返回值约束
 * 4. 函数的接口约束 
 * 5. 函数的重载
 *  (1) 签名函数，调用时类型检查函数
 *  (2) 函数签名的实现函数，通过对数据类型的判断处理相关的实现逻辑
 */
namespace B9 {

  // 1. 约束函数参数类型和函数返回值类型
  function add(num1: number, num2: number): number{
    return num1 + num2;
  }
  add(1,2)

  // 2. 可选参数类型
  function fn1(a: string, b?: string): string{
    return a
  }
  fn1('lantian');
  fn1('lantian', 'lf');

  // 3. 剩余参数
  function fn2(num: string, ...args: number[]){
    return args.reduce( (prev, item) => prev + item, 0);
  }
  console.log( fn2('1', 2, 3) );

  // 4. 函数的接口约束
  interface Fn{
    (a: string): void
  }
  const fn3: Fn = (a) => {
    console.log( a );
  }
  fn3('1')

  // 5. 函数重载
  // 重载签名
  function fn4(a: string, b: string ): string; 
  function fn4(a: number, b?: number ): number; 
  // 实现签名函数
  function fn4( a: any, b: any): any{
    if( typeof b === 'string' ){
      return a
    }else if( typeof b === 'number' ) {
      return a + b;
    }else {
      return a
    }
  }
  console.log( fn4(1) );
  fn4('1', '2' );








}

