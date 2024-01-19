'use client';
import { useState, useEffect } from "react";
interface Item {
  id: number;
  name: string;
}
export const List = () => {
  const [ data, setData ] = useState<Item[]>([]);
  useEffect( () => {
    if( typeof window !== 'undefined' ){
      fetch( '/api/goods').then( (res) => res.json()).then( ({ data }) => {
        setData( data );
      })
    }
  }, []);
  return <div className="list">
    <ul>
      { data.map( item => <li className="item" key={ item.id }>{ item.name }</li> ) }
      <li></li>
    </ul>
  </div>
}