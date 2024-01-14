import { useState, memo, useMemo, useDeferredValue, useTransition, Suspense, type ChangeEvent, type ReactNode } from "react";

const List = ({ query }: { query: string }) => {
  const word = 'hello word';
  let items: ReactNode[] = []
  if( query!=='' && word.includes( query ) ){
    const arr = word.split( query );
    items = Array.from({ length: 10000 }, ( item, i ) => <li key={ i }>{arr[0]}<span style={{ color: 'red' }}>{query}</span>{ arr[1]}</li> )
  }else {
    items = Array.from({ length: 10000 }, ( item, i ) => <li key={i}>{word}</li> )
  }
  return <>
    <ul>{ items }</ul>
  </>
}

export const UseDeferredValue = () => {
  const [ search, setSearch ] = useState( '' );
  const query = useDeferredValue( search );

  const handleChange = (e: ChangeEvent<HTMLInputElement> ) => {
    setSearch( e.target.value );
  }
  
  return (
    <>
      <input type="text" value={ search } onChange={ handleChange }/>
      <List query={ query }></List>
    </>
  );
};
