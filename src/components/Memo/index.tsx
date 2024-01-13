import { useState, memo } from "react";


const Head = memo(() => {
  return (
    <div>
    I am head，{ Math.random() }
  </div>
  ) 
})


export const Memo = () => {
  const [ count, setCount ] = useState( 0 );
  const handleClick = () => {
    setCount( count + 1 );
  }
  return (
    <>
      hello count, { count }
      <button onClick={ handleClick }>add</button>
      <Head></Head>
    </>
  );
};
