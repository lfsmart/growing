/**
 * 1. void 代表函数没有返回值
 * 2. never 函数没有结束，没有执行结束，never 被认为是空的联合类型，也就是说，没有联合项的联合类型
 */
namespace B3 {
  // 1. void 代表函数没有返回值
  function fn(): void{}
  console.log( fn() );
  const fn1 = (): void => {
    return undefined
  }
  console.log( fn1() );

  // 2. never 函数没有结束，没有执行结束
  const fn2 = (): never => {
    throw new Error( 'error...' );
  }
  fn2();

}
