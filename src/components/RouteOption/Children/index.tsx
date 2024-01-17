import { useEffect, ReactNode } from "react";
import { useHistory, useLocation, useParams, useRouteMatch, RouteChildrenProps } from "react-router-dom";

/**
 * route: children 选项参数组件形式，无法通过 props 传路由信息，可以在组件中通过路由相关的钩子函数获取路由信息
 */
export const ChildrenComponent = (): ReactNode => {
  const location = useLocation();
  const match = useRouteMatch(); // 如果路由不匹配则 match: null 
  const history = useHistory();
  console.log( { history, location, match }, 'ChildrenOptionReactNode' );
  return (
    <div>Children ReactNode!</div>
  )
}

/**
 * route：children 选项参数，无论匹不匹配组件都会被渲染，可以通过 props 获取路由信息。
 */
export const ChildrenFn = ( props: RouteChildrenProps ) => {
  console.log( props, 'ChildrenOptionFn' );
  return (
    <div>Children function!</div>
  )
}