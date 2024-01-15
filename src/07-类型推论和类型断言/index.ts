/**
 * 类型推导和类型断言
 * 1. 类型推导，系统根据变量初始值类型，推导出其数据约束类型
 * 2. 类型断言，通过 as 或 <TYpe> 断言数据类型
 * 3. !. 非空断言，断言数据存在
 * 4. const，通过 const 关键字，将数据类型转换成字面量数据类型，数据类型为只读，类似 type num=20
 * 5. 强制数据类型转换通过 unknown 关键字
 */
namespace B7 {
  // 1. 类型推论
  let str = 'lantian';

  // 2. 类型断言 as 或者 <Type>
  // let el = document.querySelector( '.box' ); // Element | null
  // let el1 = document.querySelector( '.box' ) as any;
  // let el2 = <any>document.querySelector( '.box' );

  // 3. !. 非空断言
  function fn(a: string, b?: string){
    console.log( b!.length ); // 断言 b 真实存在
  }
  fn('a');

  // 4. const 断言，数据类型为只读
  let num1 = 20 as const; // 数据类型为 20 
  type num = 20;
  // let num2: num = 30

  let person = {
    age: 18,
    name: 'lantian'
  } as const;

  let arr = [0, 1, 2] as const; //  数组只读，无法修改 
  let arr1 = <const>[0, 1, 2];

  // 强制性断言
  let a = 20 as unknown as string;

  






}
