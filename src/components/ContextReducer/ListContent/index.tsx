import { useContext } from "react";
import { Context, type Item } from "../Context";

export const ListContent = () => {
  const { state: { list=[] }, dispatch=()=>{} } = useContext( Context ) || {};

  const remove = (id: Item['id']) => dispatch({ 
    type: 'remove', 
    payload: { id }
  });

  const eidt = (id: Item['id']) => {
    const item = list.find( item => item.id == id );
    if( item ){
      // inputRef.current?.focus();
    }else {
      throw Error( 'paramer is wrong' );
    }
  }

  return (
    <ul>
      {
        list.map( item => {
          return <li key={ item.id }>
            { item.title } 
            <button onClick={ () => eidt( item.id ) }>编辑</button>
            <button onClick={ () => remove( item.id ) }>删除</button>
          </li>
        })
      }
    </ul>
  )
}