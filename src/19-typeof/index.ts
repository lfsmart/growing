/**
 * typeof 关键字
 * 1. 获取对象的数据类型
 * 2. 获取函数的类型
 * 3. 获取数组类型
 * 4. 获取枚举数据类型
 * 5. const 与 let 声明数据的 typeof 
 */
namespace B19 {

  // 1. 获取对象的数据类型
  let person = {
    name: 'lantian',
    age: 11,
    hobs: [ '唱歌', '跳舞' ],
    address: {
      province: '四川',
      center: '成都'
    }
  }
  type Person = typeof person;
  type Address = typeof person.address; // or typeof person['address']

  // 2. 获取函数的类型
  function add(num1: number, num2: number): number{
    return num1 + num2
  }
  type Fn = typeof add; // type Fn = (num1: number, num2: number) => number

  // 3. 获取数组类型
  let arr = [1, 2, 3];
  type T0 = typeof arr; // type T0 = number[]

  // 4. 获取枚举数据类型
  enum Sex {
    Man,
    Woman
  }
  type T1 = typeof Sex; // 获取对象类型
  let t1: T1 = {
    // Man: 0,
    // Woman: 1
    Man: Sex.Man,
    Woman: Sex.Woman
  }
  type T2 = keyof typeof Sex; // 'Man' | 'Woman'

  // 5. const与let声明数据的 typeof 
  let str1 = 'abc';
  const str2 = 'abc'
  type T3 = typeof str1; // type T3 = string
  type T4 = typeof str2; // type T4 = "abc"
}

