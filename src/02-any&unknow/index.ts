/**
 * 1. any 类型可以赋值任意值，也可以被任意值赋值，这里的任意类型包含自定义类型，即一切类型
 * 2. unknow 类型的数据可以被任意类型的数据赋值，但是不能赋值给除了 unknow 和 any 之外的其他类型
 */
namespace B2 {
  // 1. any 类型可以赋值任意值，也可以被任意值赋值
  let a1: any = 12;
  a1 = '12';
  a1 = true;
  a1 = {};

  let str1: string = a1;

  // 2. unknow 可以被任意值赋值，但是不能赋值给除了 unknow 和 any其他类型
  let un1: unknown;
  un1 = '1';
  un1 = true;
  un1 = undefined;
  un1 = null;

  // let st: number = un1
  // let st: string = un1
  a1 = un1;
  un1 = a1;

}
