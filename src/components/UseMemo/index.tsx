import { useState, memo, useMemo } from "react";


const Head = memo(({ count }: { count: number }) => {
  return (
    <div>
    I am head，{ Math.random() }
  </div>
  ) 
})


export const UseMemo = () => {
  const [ count, setCount ] = useState( 0 );
  const [ msg, setMsg ] = useState( 'hello react' );
  const list = useMemo( () => [ msg.toLowerCase(), msg.toUpperCase() ], [ msg ]);
  const handleClick = () => {
    if( count == 3 ){
      setCount( 3 )
    }else {
      setCount( count + 1 );

    }
  }
  return (
    <>
      hello count, { count }
      <button onClick={ handleClick }>add</button>
      <Head count={ count }></Head>
    </>
  );
};
