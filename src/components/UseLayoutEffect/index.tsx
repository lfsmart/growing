import { useRef, useEffect, useState, useCallback, ChangeEvent, useLayoutEffect } from "react";


export const UseLayoutEffect = () => {
  const [ msg, setMsg ] = useState( 'App hello' );
  // console.log( 'init' );
  // useEffect( () => {
  //   for(let i = 0; i< Math.pow(10, 9); i++ ){}
  //   console.log( 'useEffect' );
  //   setMsg( 'hello App');
  // });

  useLayoutEffect( () => {
    for(let i = 0; i< Math.pow(10, 9); i++ ){}
    console.log( 'useLayoutEffect' );
    setMsg( 'hello App');
  })
  
  return (
    <div>
      { msg }
    </div> 
  )
}
