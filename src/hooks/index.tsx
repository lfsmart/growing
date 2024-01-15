import { useEffect, useState } from "react"

export const useMouse = () => {
  const [ state, setSate ] = useState({
    pageX: 0,
    pageY: 0
  });

  useEffect( () => {
    const move = (e: MouseEvent) => {
      setSate({
        pageX: e.pageX,
        pageY: e.pageY
      })
    }
    document.addEventListener( 'mousemove', move, false );
    return () => document.removeEventListener( 'mousemove', move );
    
  }, []);

  return state;
}