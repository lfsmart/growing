import { useRef, ChangeEvent, useReducer } from "react";
type Item = {
  id: number;
  title: string;
}
type State = {
  list: Item[];
  title: string;
}
const listenReducer = ( state: State , action: Action ): State  => {
  const { type, payload } = action;
  switch( type ){
    case 'add': return {
      ...state,
      title: '',
      list: [ ...state.list, { id: Date.now(), title: payload.title }]
    }
    case 'remove': return {
      title: '',
      list: state.list.filter( item => item.id != payload.id )
    }
    case 'input': return {
      ...state,
      title: payload.title,
    }
    default: return state;
  }
}

export const UseReducer = () => {
  const inputRef = useRef<OrNull<HTMLInputElement>>( null );
  const [{ title, list }, listDispatch ] = useReducer(listenReducer, {
    title: '', 
    list: [{
      id: 1, title: 'aaa'
    }]
  });

  const add = () => listDispatch({ 
    type: 'add', 
    payload: { title } 
  });

  const remove = (id: Item['id']) => listDispatch({ 
    type: 'remove', 
    payload: { id }
  });

  const eidt = (id: Item['id']) => {
    const item = list.find( item => item.id == id );
    if( item ){
      inputRef.current?.focus();
    }else {
      throw Error( 'paramer is wrong' );
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    listDispatch({
      type: 'input',
      payload: {
        title: e.target.value
      }
    })
  }

  return (
    <>
      <input 
        type="text" 
        onChange={ (e) => handleChange(e) } 
        value={ title } 
        ref={ inputRef }
      />
      <button onClick={ add }>add</button>
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
    </>
  );
};
