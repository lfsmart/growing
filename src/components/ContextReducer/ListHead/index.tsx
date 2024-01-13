import { useRef, useContext, type ChangeEvent } from 'react';
import { Context } from '../Context';
export const ListHead = () => {

  const inputRef = useRef<OrNull<HTMLInputElement>>( null );
  const { state: { title='' }, dispatch=()=>{} } = useContext( Context );

  const add = () => dispatch({ 
    type: 'add', 
    payload: { title } 
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
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
        onChange={(e) => handleChange(e)}
        value={title}
        ref={inputRef}
      />
      <button onClick={add}>add</button>
    </>
  );
};
