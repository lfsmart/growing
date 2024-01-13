import { useReducer } from 'react';
import { ListContent } from "./ListContent";
import { ListHead } from "./ListHead";
import { Context, initState, type Item, type State } from './Context';

const reducer = ( state: State , action: Action ): State  => {
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

export const ContextReducer = () => {
  const [ state, dispatch ] = useReducer( reducer, initState );
  return (
    <Context.Provider value={{ state, dispatch }}>
      <ListHead></ListHead>
      <ListContent></ListContent>
    </Context.Provider>
  );
}