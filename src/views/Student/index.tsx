import { RouteComponentProps, RouteChildrenProps, match as Match } from 'react-router-dom';
interface Item {
  id: number;
  name: string;
}
const list: Item[] = [
  { id: 1, name: '苹果'},
  { id: 2, name: '橘子'},
  { id: 3, name: '香蕉'},
]
interface Props extends RouteChildrenProps  {
  match: Match<{ id: string }> | null; // 这里指定了 id 是字符串类型
}

const handleClick = () => {
  // props?.history.push({
  //   pathname: '/student/2'
  // })
}

export const Student = () => {
  // const item = list.find( item => String(item.id) == props.match?.params.id );
  // console.log( props );
  return <div>
    hello Student! 
    <button onClick={ () => handleClick(  ) }>click me!</button>
  </div>
}