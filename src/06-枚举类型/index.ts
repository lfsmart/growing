/**
 * 枚举类型
 * 1. 数字枚举，如果设置了默认值，后面的则会自动加一。未设默认值则从 0 开始依次递增 1。可以反向获取数据
 * 2. 字符串枚举，每一个枚举对象都需要初始化， 字符串枚举不能反向获取数据
 * 3. 常量枚举，不会编译枚举类型，直接获取值
 * 4. 异构枚举，混合字符串枚举和数字枚举，数字的按照数字枚举、字符串的按照字符串枚举。
 */
namespace B6 {

  // 1. 数字枚举
  enum Direction {
    Top,
    Left,
    Right,
    Bottom
  }

  let d1: Direction = Direction.Bottom;
  console.log( d1, 'Direction');
  const dir: string = Direction[0]; // Top, 反向获取数据 

  // 2. 字符串枚举
  enum Person {
    HEAD = 'HEAD',
    HAND = 'HAND',
    FOOT = 'FOOT'
  }

  // 3. 常量枚举
  const enum ANIMAL {
    CAT,
    DOG,
    FISH
  }
  const a1: ANIMAL = ANIMAL.CAT;

  // 4. 异构枚举，混合字符串枚举和数字枚举
  enum STR {
    A = 'A',
    B = 3,
    C = 6,
    D = 'D',
    E = 'E'
  }
  console.log( STR[ STR['B'] ] );
}
