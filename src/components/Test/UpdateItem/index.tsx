import { useState } from "react";
interface Item {
  id: number;
  title: string
}
export const UpdateItem = () => {
  const [ list, setList ] = useState<Item[]>([
    { id: 1, title: 'item-1' },
    { id: 2, title: 'item-2' },
    { id: 3, title: 'item-3' },
    { id: 4, title: 'item-4' },
  ]);
  const handleClick = (title: Item['title']) => {
    // 只能通过 遍历的方式更新数组，或者通过 toSpliced 方法
    // setList( list.map())
  } 
  return <>
    
    <div>
      { list.map( item => <div key={ item.id }>{ item.title }</div> ) }
    </div>
    <button onClick={ () => handleClick( 'item-2' ) }>更新</button>
    <button onClick={ () => handleClick( 'item-3' ) }>更新</button>
  </> 
}