import { lazy, useState, Suspense } from "react";
const Header = lazy( () => import( './Header.tsx' ) );
export const Lazy = () => {
  const [ show, setShow ] = useState(false);
  const handleClick = () => {
    setShow( !show )
  }
  return <div>
    hello lazy,
    { show && <Suspense fallback={ <span>loading</span> } >
      <Header />
      </Suspense> 
    }
    <div>
      <button onClick={ handleClick }>显示/隐藏</button>
    </div>
  </div>
}