/**
 * 27. 类型取值，去数组或者对象接口数据类型，并定义新的数据类型
 */

type ItemType = string | number | { num: number, age: number };

interface MenuProps {
  prefixCls?: string;
  rootClassName?: string;
  items?: ItemType[];
}

// 1. 可以通过类型键 访问接口数据类型 
type T1 = MenuProps['items'];
type T2 = Required<MenuProps>['items'];

// 2. 取出了 ItemType 的数据类型
type T3 = ItemType[];
type T4 = T3[number];