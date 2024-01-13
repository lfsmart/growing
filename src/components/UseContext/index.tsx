import { useRef, useState, createContext, useContext } from "react";

const Context = createContext<OrNull<number>>(null);


const Title = () => {
  const value = useContext( Context );
  return (
    <div>
      hello, Title, { value }
    </div>
  )
}

const Head = () => {
  const value = useContext( Context );
  return (
    <div>
      hello Head, { value }
      <Title></Title>
    </div>
  ) 
}
export const UseContext = () => {
  const [ count, setCount ] = useState(0);

  return (
    <Context.Provider value={ count }>
      <div> hello App</div>
      <button onClick={ () => setCount(count + 1)}>计数</button>
      <Head></Head>
    </Context.Provider>
  )
}
