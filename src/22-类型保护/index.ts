/**
 * 类型保护
 *  在条件判断中把类型收窄为 实际类型
 *  1. in 通过特定属性判断区分不同的数据类型， 在 ts 中为收窄
 *  2. typeof 条件判断， 在 ts 中为收窄
 *  3. instanceof 判断为引用类型，在 ts 中为收窄
 * ·4. is 使用谓词
 */
namespace B22 {

  // 1. in 通过特定属性判断区分不同的数据类型， 在 ts 中为收窄
  interface Cat {
    name: string;
    jump: boolean;
  }
  interface Dog {
    name: string;
    bark: boolean;
  }
  type Animal = Cat | Dog;
  function getAnimal(o: Animal){
    if('jump' in o){
      o.name = 'lantian'
    }else {
      o.bark = true;
    }
  }

  // 2. typeof 条件判断， 在 ts 中为收窄
  function fn1(a: string | number){
    if(typeof a === 'string'){
      return a.length
    }else {
      return a * 2
    }
  }

  // 3. instanceof 判断为引用类型，在 ts 中为收窄
  class Person {
    name: string = 'lantian';
  }
  const p1 = new Person();
  if(p1 instanceof Person){
    console.log( '是' );
  }

  // 4. is 使用谓词
  function isStr(str: unknown): str is string{;
    return typeof str === 'string';
  }
  function getLength(o: unknown){
    if( isStr(o) ){
      return o.length; // 不使用谓词，此处会类型报错
    }else{
      return o
    }
  }










}