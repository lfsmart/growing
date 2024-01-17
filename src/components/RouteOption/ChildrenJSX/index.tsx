import { RouteChildrenProps } from 'react-router-dom'
/**
 * route：可以通过配置子组件的渲染方式渲染组件
 */

export const ChildrenJSX = (props: RouteChildrenProps | unknown ) => {
  console.log( props ); // <ChildrenJSX></ChildrenJSX> 需要使用钩子函数获取路由信息
  // const location = useLocation();
  // const match = useRouteMatch(); // 如果路由不匹配则 match: null 
  // const history = useHistory();
  return (
    <div>Children ChildrenJSX!</div>
  )
}

export const ChildrenJSXFn = (props: RouteChildrenProps ) => {
  console.log( props ); // <ChildrenJSX></ChildrenJSX> 需要使用钩子函数获取路由信息
  // const location = useLocation();
  // const match = useRouteMatch(); // 如果路由不匹配则 match: null 
  // const history = useHistory();
  return (
    <div>Children ChildrenJSX!</div>
  )
}