/**
 * 1. 数组类型约束
 *  一个是字面量 number[] 或者使用 Array<number>
 * 2. 元组约束
 *  字面量定义根据顺序对应约束，约束元素的长度和类型, 但是使用数组方法操作的时候，满足数组联合类型
 */
namespace B5 {

  // 1. 数组类型约束
  let arr1: number[] = [1, 2, 3]; // 数组字面量约束

  let arr2: Array<number> = [1, 2, 3]; // 泛型方式


  // 2. 元组 根据顺序对应约束，约束元素的长度和类型, 但是使用数组方法操作的时候，满足数组联合类型
  let arr5: [ string, number ] = [ '1', 1 ];
  arr5.push(1); // string|number
  console.log( arr5 );

  let arr6: Array<any> = [ '1', 1, true, false ];

  // 二维数组约束
  let arr7: number[][] = [ [1, 3 ], [2,3] ];
  let arr8: Array<Array<number>> = [ [1, 3 ], [2,3] ];

}
