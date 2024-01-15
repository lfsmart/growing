import { Profiler as ReactProfiler, useState } from 'react'

const Head = ({ count }: { count: number }) => {
  return <div>
    hello Head, { count }
  </div>
}

export const Profiler = () => {
  const [ count, setCount ] = useState( 0 );
  const handleClick = () => {
    setCount( count + 1 );
  }
  const onRender = (id: string, phase: string, actualDuration: number, baseDuration: number, startTime: number, commitTime: number) => {
    console.log({ 
      id, 
      phase, 
      actualDuration, 
      baseDuration, 
      startTime, 
      commitTime,
    });
  }
  return <div>
    hello Profiler, { count }
    <button onClick={ handleClick }>click me!</button>
    <ReactProfiler id="Profiler" onRender={ onRender }>
      <Head count={ count }></Head>
    </ReactProfiler>
  </div>

}