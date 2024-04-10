/**
 * 接口继承扩展
 */
namespace B100 {
  type A = {
    name: string;
    age: number;
  }
  type B = {
    address: string;
    phoneNum?: number;
  }
  type AB = A | B;
  // interface AA extends AB {}

  type AB2 = A & B;
  interface AA2 extends AB2 {
    loc: string;
  }
  const aa2: AA2 = {
    name: '',
    age: 0,
    address: '',
    loc: ''
  }




  type AC = AB & {
    sex: string;
  }

  const ac: AC = {
    // name: '',
    address: '',
    sex: ''
  }



}