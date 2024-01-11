import { useState, ReactNode, useEffect, ChangeEvent } from "react";
// const Counter = () => {
//   const [ count, setCount ] = useState( 0 );
//   return <button onClick={ () => setCount( count + 1 ) }>count,{ count }</button>
// }
function App(): ReactNode {

  const [ value, setValue ] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement> ) => {
    setValue( e.target.value );
  }
  return (
    <div className="card"  >
      <input type="text" value={ value } onChange={ handleChange }/>
    </div>
  );
}
export default App;
