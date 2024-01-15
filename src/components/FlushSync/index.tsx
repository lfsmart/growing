
import { useRef, useState } from "react"
import { flushSync } from 'react-dom'

export const FlushSync = () => {
  console.log(1);
  const [ count, setCount ] = useState(0)
  const [ count2, setCount2 ] = useState(0)
  const [ count3, setCount3 ] = useState(0)
  const ref = useRef<OrNull<HTMLDivElement>>(null);
  const handleClick = () => {
    flushSync( () => {
      setCount( count + 1 );
    })
    setCount2( count2 + 1 )
    setCount3( count3 + 1 )
    console.log( ref.current?.innerHTML );
  }
  return (
    <div>
      <button onClick={ handleClick }>click me!</button>
      <div ref={ ref }>count, { count }, { count2 }, { count3 }</div>
    </div>
  )
}