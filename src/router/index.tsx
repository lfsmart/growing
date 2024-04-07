import { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import { FLoading } from '@/components'

import Login from '@/views/Login';
import Home from '@/views/Home'
import Layout from '@/views/Layout';


const About = lazy(() => import('@/views/About'));
const User = lazy(() => import('@/views/User'))
const NotFound = lazy(() => import('@/views/NotFound'))

const withLoadingComponent = (component: JSX.Element): JSX.Element => (
  <Suspense fallback={<FLoading />}>{component}</Suspense>
);

const routes = [
  {
    path: '/',
    // 访问根路径 重定向到 home
    element: <Navigate to='/home'></Navigate>,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/home',
        element: withLoadingComponent(<Home />),
      },
      {
        path: '/about',
        element: withLoadingComponent(<About />),
      },
      {
        path: '/user/information',
        element: withLoadingComponent(<User />),
      },
      {
        path: '/about/name',
        element: withLoadingComponent(<User />),
      },
    ],
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  // 未匹配路由到 404 页面, 独立页面，也可以重定向到其他页面, 或者没有权限的页面
  {
    path: '*',
    element: withLoadingComponent(<NotFound />),
  },
]
export default routes
