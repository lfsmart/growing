import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount( count + 1 );
  }

  return (
    <>
      <div onClick={ handleClick }>
        hello react, { count }
      </div>
     
    </>
  )
}

export default App
