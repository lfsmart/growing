import { useRef, useEffect, useState, useCallback, ChangeEvent } from "react";
export const UseEffect1 = () => {
  const inputRef = useRef<OrNull<HTMLInputElement>>( null );

  useEffect( () => {
    inputRef.current!.focus()
  }, [])

  return (
    <>
      <input type="text" ref={ inputRef }/>
    </>
  );
};
export const UseEffect2 = () => {
  const [ count, setCount ] = useState(0);
  const handleClick = () => {
    setCount( count + 1)
  }
  useEffect( () => {
    const foo = () => {
      console.log( count );
    }
    foo()
  }, [ count ]);

  return (
    <>
      <button onClick={ handleClick }>click me!</button>
    </>
  );
};

export const UseEffect3 = () => {
  const [ show, setShow ] = useState( true );
  const [ count, setCount ] = useState( 0 );

  const handleClick = () => {
    setShow( !show );
    setCount( count + 1)
  }
 
  useEffect( () => {
    console.log('setup:', count);
    return () => {
      console.log( 'cleanup:', count );
    }
  }, [count]);

  return (
    <>  
      <hr />
      <button onClick={ handleClick }>关闭聊天室,{count}</button>
    </>
  );
};



const Chat = ({ title, theme }: { title: string, theme: string }) => {

  useEffect( () => {
    console.log( '进入', title );
    return () => {
      console.log( 'cleanup: ', title );
    }
  }, [ title ]);
 
  return <div> hellochat</div>
}

export const UseEffect = () => {
  const [ show, setShow ] = useState( true );
  const [ isDark, setDark ] = useState( false );
  const [ title, setTitle ] = useState( '情感聊天室' );

  const handleClick = () => {
    setShow( !show );
  }

  useEffect( () => {
    fetch( '/api/goods').then( (res) => res.json()).then( ({ data }) => {
      console.log(data);
    })

  }, [])


  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTitle( e.target.value )
  }

  const handleCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDark( e.target.checked )
  }
  
  return (
    <> 
      <div>
        hello App
        <button onClick={ handleClick }>关闭聊天室</button>
        <select name="select" onChange={ handleChange } value={ title }>
          <option value="情感聊天室">情感聊天室</option>
          <option value="体育聊天室">体育聊天室</option>
        </select>
        <input type="checkbox" checked={ isDark } onChange={ handleCheckChange }/>黑暗主题
        { show && <Chat title={ title } theme={ isDark ? 'dark' : 'light' }></Chat> }
      </div> 
    </>
  );
};
