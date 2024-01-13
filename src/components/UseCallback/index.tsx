import { useState, memo, useMemo, useCallback } from "react";

const Head = memo(({ fn }: { fn: VoidFunction }) => {
  return (
    <div>
    I am head，{ Math.random() }
  </div>
  ) 
})

export const UseCallback = () => {
  const [ count, setCount ] = useState( 0 );
  const handleClick = () => {
    setCount( count + 1 );
  }
  // const fn = useCallback(() => {
  //   console.log( 1 );
  // }, [])
  const fn = useMemo( () => () => {
    console.log(1);
  }, [ count ])
  return (
    <>
      hello count, { count }
      <button onClick={ handleClick }>add</button>
      <Head fn={ fn }></Head>
    </>
  );
};
