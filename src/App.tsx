import { useEffect } from 'react';
import { useRoutes, useLocation, useNavigate } from 'react-router-dom'
import router from '@/router'

// const ToLgoin = () => {
//   const navigateTo = useNavigate();
//   useEffect(() => {
//     navigateTo('/login')
//   }, []);
//   return <></>
// }

// const ToHome = () => {
//   const navigateTo = useNavigate();
//   useEffect(() => {
//     navigateTo('/home')
//   }, []);
//   return <></>
// }


// 路由守卫
const BeforeRouteEnter = () => {
  const { pathname } = useLocation();
  const navigateTo = useNavigate();
  const outlet = useRoutes( router );
  const token = localStorage.getItem( 'token' );
  useEffect(() => {
    // 1. 如果 访问的是登录页面 且 有 token， 跳转至首页
    if( token && pathname === '/login' ){
      navigateTo('/home')
    }else if ( !token && pathname !== '/login' ) {
      navigateTo('/login')
    }
  }, []);
  return <>{outlet}</>
}





function App() {
  // 类似于 vue 中的路由注册
  // Vue.use(router);
  
  return (
    <div className='App'>
      <BeforeRouteEnter></BeforeRouteEnter>
    </div>
  ) 
}
export default App
