import { useRef, useEffect, useState, useLayoutEffect, useInsertionEffect } from "react";


export const UseInsertionEffect = () => {
  const [ msg, setMsg ] = useState( 'App hello' );
  const ref = useRef( null );
  console.log( 'init' );
  useEffect( () => {
    console.log( 'useEffect:', ref );
  })

  useInsertionEffect( () => {
    console.log( 'useInsertionEffect:', ref );
  })

  useLayoutEffect( () => {
    console.log( 'useLayoutEffect:', ref );
  })
  
  return (
    <div ref={ ref }>
      { msg }
    </div> 
  )
}
