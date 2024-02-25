// 状态管理
import { useCount } from '@/store';
export const StateCtrl = () => {
  const { role, count, dispatch, dispatchAdd } = useCount();
  const handleClick = (bType: string) => {
    switch( bType ){
      case 'add': dispatch({ type: 'add', payload: 20 }); break;
      case 'reset': dispatch({ type: 'reset' }); break;
      case 'sub': dispatch({ type: 'sub' }); break;
    }
  }
  return (
    <>
      <div>{ role }, { count }</div>
      <button onClick={ () => handleClick( 'add' ) }>add</button>
      <button onClick={ () => dispatchAdd( count ) }>dispatchAdd</button>
      <button onClick={ () => handleClick( 'reset' ) }>reset</button>
      <button onClick={ () => handleClick( 'sub' ) }>sub</button>
    </>
  )
}