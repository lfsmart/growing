## 1. 项目安装

```bash
npm init vite@2.9.15 # 安装指定版本的 vite
npm init vite@2.9.x 
```

​	安装指定版本的 vite，在项目配置项时，选择 `react-ts` 使用 react 版本。

## 2. 项目依赖

```json
{
	"dependencies": {
       "react": "^18.2.0",
       "react-dom": "^18.2.0",
       "react-redux": "^7.2.8",
       "react-router-dom": "^6.3.0",
       "redux": "^4.1.2",
       "reset-css": "^5.0.2"
    }
}
```

​	使用了 `reset-css` 初始化样式表，主要用于样式重置，如去除元素的内外边距等。

## 3. 运行

```bash
npm run dev
```

​	vite 默认端口号是300，如果需要指定端口号，需要单独指定方式有两种，一种使用[命令行](https://cn.vitejs.dev/guide/cli.html)，另一种是在[vite.config.ts](https://cn.vitejs.dev/config/server-options.html)文件中指定。下面是在命令行中指定，在package.sjon 配置。指定端口号，和默认网路地址。

```json
{
  "scripts": {
    "dev": "vite --host --port 3000",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
}
```

## 4. scss 安装和简单使用

### 4.1 安装

```bash
npm i -D sass # 安装 sass
```

## 5. 路径别名

​	使用 `node:path` 在 vite 配置路径别名。

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const path = require( 'node:path' );
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

​	在 typescript 使用 node，需要安装 node 类型声明。

```bash
npm i -D @types/node
```

​	在 typescript 中配置路径别名。

```javascript
{
	"baseUrl": "./",
	"paths": {
		"@/*": ["src/*"]
	}
}
```

## 6. 样式引入

​	在函数组件中，如果使用 import 直接导入样式，导入的样式其实是全局样式，会造成样式冲突。因此不能在组件中直接使用 import 导入样式表。需要采用模块化引入，在样式文件中使用 `.module.extname` 的方式定义，然后使用对象的方式定义样式即可。

```tsx
import style from './css/comp.module.css';
function Comp(){
    return (
        <div className={style.box}>Comp组件</div>
    )
}
```

​	使用 less 或者 sass 中的 `:global` 可以将样式定义在其内部，这样可以直接使用而不会被编译称哈希样式。注意如果使用的是 sass 则使用的是 `:global(.classname)` 。

```less
// less
.box{
  color: red;
  :global{
    .p1 {
      color: green;
    }
    .name{
      color: blue;
    },
    .user-name{
    	color: red;   
    }
  }
}
```

​	在组件中的使用：

```tsx
function Comp(){
    return (
        <div className={style['user-name']}>Comp组件</div>
    )
}
```

​	或者使用驼峰的书写方式，使用驼峰需要 `vite` 开启驼峰支持

```tsx
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localcConvention: 'camelCase'
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
});
```

​	驼峰配置完成后，在组件中可以使用对象的方式直接写样式。

```tsx
function Comp(){
    return (
        <div className={style.userName}>Comp组件</div>
    )
}
```

## 7. antd 引入

### 安装 antd

```bash
npm i -S antd@4.x # 5.0 已经发布，现在使用的是4.x版本
npm i -S @ant-design/icons@4.x
```

​	需要单独引用样式表，如果是直接引入`@import 'antd/dist/antd.less;` 文件则需要在 `vite.config.ts` 配置文件中启用 `javascriptEnabled`，如下所示：

```javascript
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
});
```

​	在 antd4.x 版本以后，组件本身支持按需引入，样式的引入需要手动实现，使用 `vite-plugin-style-import@1.4.1` 。注意，如果采用按需加载样式，则会覆盖静态引入的样式。

```bash
npm i -D vite-plugin-style-import@1.4.1 
```

​	在 vite.config.ts 中进行配置。样式默认自动加载的是 less 样式表，需要使用安装 `less` ,在 vite 构建工具中不需要安装 `less-loader`

```tsx
import styleImport, { AntdResolve } from 'vite-plugin-style-import';
export default defineConfig({
  plugins: [
    react(),
    styleImport({
      resolves: [
        AntdResolve()
      ]
    })
  ],
});
```

## 8. 路由

### 8.1 组件式

​	在 react 18.x 版本之前， react 路由需要使用组件的形式实现而不是像 vue 路由通过配置的方式定义路由。如下所示：

```tsx
import App from '../App';
import { Home } from '@/views/Home';
import { About } from '@/views/About';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// 两种路由模式的组件，BrowserRouter( history模式 )，HashRouter( Hash模式 )
const baseRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
export default baseRouter;
```

​	然后，在 main.tsx 中使用引入使用

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'reset-css';
import '@/assets/styles/index.less';
import Router from '@/router'; // 使用路由
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
```

​	然后，通过 `react-router-dom` 中的 `Outlet` 组件渲染路由组件，`Outlet` 组件与 vue 中 `router-view` 功能类似。

```tsx
import { Outlet } from 'react-router-dom';
function App() {
  return (
    {/* 占位符 用来展示组件 与 router-view 类似 */}
    <Outlet></Outlet>
  );
}
export default App;
```

​	路由跳转，通过 `Link` 组件实现路由跳转。

```tsx
import { Outlet, Link } from 'react-router-dom';
function App() {
  return (
    <div className='App'>
      <Link to="/home">Home</Link>
      <Link to="/about">About</Link>
      <Outlet></Outlet>
    </div>
  );
}
export default App;
```

​	重定向，通过 `Navigate` 组件实现路由重定向。

```tsx
import App from '../App';
import { Home } from '@/views/Home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
export default () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
```

### 8.2 配置式

​	在 react 18.x 版本后，可以通过配置的方式定义路由。 路由配置如下所示，配置与 vue 中的路由配置方式基本相同。

```tsx
import { Home } from '@/views/Home';
import { About } from '@/views/About';
import { Navigate } from 'react-router-dom';
const routes = [
  {
    path: '/',
    element: <Navigate to="/home"></Navigate>,
  },
  {
    path: '/home',
    element: <Home></Home>,
  },
  {
    path: '/about',
    element: <About />,
  },
];
export default routes;
```

​	然后，在 main.tsx 中使用路由模式组件渲染路由。App.tsx 组件为路由配置渲染的逻辑。

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </React.StrictMode>
);
```

​	然后，在 App.tsx 中使用路由钩子`useRoutes` 将配置文件注入，然后渲染即可。

```tsx
import { useRoutes } from 'react-router-dom';
import router from '@/router';
function App() {
  // 类似于 vue 中的路由注册
  // Vue.use(router);
  const outlet = useRoutes( router );
  return (
    <div className='App'>{ outlet }</div>
  );
}
export default App;
```

### 8.3 路由懒加载

​	使用 react 模块的 `lazy` 方法实现路由模块的异步加载。

```tsx
import { lazy } from 'react';
const About = lazy( () => import('@/views/About') );
const routes = [{
  path: '/about',
  element: <About></About>,
}];
export default routes;
```

​	使用 `lazy` 方式加载路由，需要使用 react 中内置的异步组件 `<Suspense>`，该组件与 vue3.0 中的异步组件功能一致。

```tsx
import { lazy, Suspense } from 'react';
const About = lazy( () => import('@/views/About') );
const routes = [{
  path: '/about',
  element: <Suspense><About /></Suspense>,
}];
export default routes;
```

​	`Suspense` 组件可以通过可选参数，配置 加载效果。

```tsx
import Loading from '@/components/Loading';
<Suspense fallback={<Loading>}>
	<About></About>
</Suspense>
```

​	将异步组件封装成函数。

```tsx
import { lazy, Suspense } from 'react';
const About = lazy( () => import('@/views/About') );
const withLoadingComponent = (component: JSX.element): JSX.element => (
	<Suspense>{ com }</Suspense>
)
const routes = [{
	path: '/about',
	element: withLoadingComponent(<About />),
}];
export default routes;
```

## 9. antd layout 布局

​	react 中的钩子函数是使用泛型函数实现的，因此如果需要单独指定数据类型的话，通过传入泛型数据类型即可。如下所示：

```tsx
import { useState } from 'react';
function Comp(){
    const [ count, setCount ] = useState<number>(0);
    return <div>{count}</div>
}
```

### 9.1 编程式路由跳转

​	编程式路由跳转需要使用 `useNavigate` 路由钩子函数。

```tsx
import React, { useState, ReactNode, Key, FC } from 'react';
import { useNavigate } from 'react-router-dom';
const App: FC = () => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate( '/home' );
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
    	<div onClick={ handleClick }>去首页</div>
    </Layout>
  );
};
export default App;
```

### 9.2 子路由配置

​	配置子路由与vue有较大不同，第一个路由配置是根路径并且渲染根组件，在根路由的基础上配置子路由页面。

```tsx
import { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import { Loading } from '@/components'
const Root = lazy(() => import('@/views/root')) // 根
const Home = lazy(() => import('@/views/Home'))
const withLoadingComponent = (component: JSX.Element): JSX.Element => (
  <Suspense fallback={<Loading />}>{component}</Suspense>
)
const routes = [
  {
    path: '/',
    // 访问根路径 重定向到 home
    element: <Navigate to="/home"></Navigate>,
  },
  {
    path: '/',
    element: <Root />,
    children: [{
      path: '/home',
      element: withLoadingComponent(<Home />),
   }],
  },
]
export default routes
```

### 9.3 配置缺省页面

​	与 vue-router 一样，react 路由可以通过配置 * 匹配缺省路径。路由按照配置顺序由上到下命中，如果是非法路由则被 `path` 为 `*` 的命中。

```tsx
import { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import { FLoading } from '@/components'

const Root = lazy(() => import('@/views/root')) // 根
const Home = lazy(() => import('@/views/Home'))
const NotFound = lazy(() => import('@/views/NotFound'))

const withLoadingComponent = (component: JSX.Element): JSX.Element => (
  <Suspense fallback={<FLoading />}>{component}</Suspense>
)
const routes = [
  {
    path: '/',
    // 访问根路径 重定向到 home
    element: <Navigate to='/home'></Navigate>,
  },
  {
    path: '/',
    element: <Root />,
    children: [{
      path: '/home',
      element: withLoadingComponent(<Home />),
    }],
  },
  // 未匹配路由到 404 页面, 独立页面， 也可以重定向到其他页面
  {
    path: '*',
    element: withLoadingComponent(<NotFound />),
  },
]
export default routes
```

### 9.4 设置路由导航默认选项

​	通过路由的钩子函数 `useLocation`  获取当前路由信息，通过当前路由信息中的 `pathname` 。[关于react开发环境中渲染两次问题说明](https://blog.csdn.net/HYHhmbb/article/details/125973790)。

```tsx
import { DesktopOutlined, FileOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import { useState, ReactNode, Key, FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function getItem( label: ReactNode, key: Key, icon?: ReactNode, children?: MenuItem[] ): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  }
}
const items: MenuItem[] = [
  getItem('首页', '/home', <PieChartOutlined />),
  getItem('关于', '/about', <DesktopOutlined />),
  getItem('个人中心', '/user', <UserOutlined />, [
    getItem('用户信息', '/user/information'),
  ]),
  getItem('文件系统', '9', <FileOutlined />),
];
const FNav: FC = () => {
  const [ openKeys, setOpenKeys ] = useState<string[]>([]);
  const navigate = useNavigate();
  const { pathname } = useLocation(); // 当前路由
  const handleMenuItem = (e: MenuInfo) => {
    navigate( e.key ); // 跳转
  }
  return (
    <Menu
      theme='dark'
      selectedKeys={[ pathname ]}
      openKeys={ openKeys }
      mode='inline'
      items={ items }
      onClick={ handleMenuItem }
    />
  )
};
export default FNav;
```

​	通过递归的方式实现默认打开自己菜单选项。

```tsx
// 递归函数
function getActivedMenu(data: MenuItem[], pathname: string ): string | null{
  for( let i = 0; i < data.length; i++ ){
    const item = data[i]
    if( item.children ){
      if( item.children.find( children => children.key === pathname ) ){
        return item.key;
      }
      return getActivedMenu( item.children, pathname );
    }
  }
  return null
}
```

​	递归函数，需要在钩子函数 `useEffect` 中调用。

```tsx
const FNav: FC = () => {
  const [ openKeys, setOpenKeys ] = useState<string[]>([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect( () => {
    const defaultKey = getActivedMenu( items, pathname );
    if( defaultOpenKey ){
      setOpenKeys([ defaultOpenKey ])
    }
  }, [])
  // ...省略部分代码
};
```

## 10. react-redux

​	第一步：创建状态管理仓库，通过 redux 中的 `legacy_createStore` 方法，在以往版本中提供的是 `createStore` 两种方法五明显区别。

```tsx
import { legacy_createStore as createStore } from 'redux';
import reducer from './reducer';
export default createStore(reducer); // 创建状态
```

​	第二步：创建好 store 后，需要通过 `react-redux` 中的组件 `Provider` 作为根组件 将 store 挂载到全局。

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/store';
import '@/assets/css/index.less';
import App from '@/App';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={ store }> 
      <React.StrictMode>
        <BrowserRouter>
          <App></App>
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
);
```

​	第三步：创建数据处理 reducer，需要保证 reducer 是一个纯函数，将处理后的 state 返回即可，通常通过解构的方式合并状态参数。为了规范 reducer 状态管理，建议使用模块化的方式管理 store 状态。模块话管理需要使用 `redux` 中 `combineReducers` 方法合并所有的 reducer, 并统一导出。

```tsx
const INITIAL_STATE = {}
interface ActionType extends object {
   type: string;
   [key: string]: any
}
export default ( state=INITIAL_STATE, action: ActionType ) => {
  const { type, initData } = action;
    switch(type){
        case 'COMMON/INIT': return {
            ...state,
            initData
        }
        default: return state       
    }
}
```

```tsx
import { combineReducers } from 'redux';
import common from './common';
export const rootReducer = combineReducers({
  common,
});
```

​	第四部：定义 action，理解成用户操作行为等。actions 定义包含两部分，一个是全局唯一的 type 值，一个是负载 payload?，也就是数据，数据非必传。

```tsx
export const init = (payload: any) => {
  return {
    type: 'COMMON/INIT',
    payload: {
      name: 'lantian',
      sex: 1
    }
  }
}
```

​	第五步： 在视图中获取 store 状态管理库中的数据状态。主要是通过 `react-redux` 钩子函数 `useSelectore` 。如果仓库使用的模块话，则在获取状态数据的时候需要从模块中获取相应的状态如下面的 common 模块。至于 store 状态数据的类型，`react-redux` 提供了数据类型 `RootStateOrAny` 。当然如果想更准确的数据类型在 `types/index.d.ts` 中 `declare type RootState = ReturnType<typeof import('@/store').getState>` 。 注意在类型声明文件中不得将其模块化，如使用 export 或 import 等方式。

```tsx
import { RootStateOrAny, useSelector } from 'react-redux'
const View = () => {
  // 模块合并后，
  const { initData } = useSelector( ({ common: { initData } }: RootStateOrAny ) => ({
      initData
    })
  );
  return <div></div>;
}
export default View
```

```typescript
// 在 types/index.d.ts 声明 store 的 state 状态类型
declare type RootState = ReturnType<typeof import('@/store').getState>
```

​	第六：通过 `react-redux` 中的 `useDispatch` 钩子函数触发 定义的 `actions` 。对比 class 方式 hook 方式更简单，更容易理解。

```tsx
const dispath = useDispatch();
const Login: FC = () => {
  const dispath = useDispatch();
  const { initData } = useSelector( ({ common: { initData } }: RootStateOrAny ) => ({
      initData
    })
  );
  const handleClick = () => {
    dispath(
      actions.aCommon.init({
        ...initData,
        age: ++initData.age
      })
    )
  }
  return <div>{initData.age}</div>;
}
export default Login
```

​	如果需要，可以将 reducer 里面的方法进行封装处理，将其做成一个黑箱，输入一个状态输出一个新的状态。

## 11. 中间件 redux-thunk

​	因为 redux 本身是不支持异步状态管理的，因此需要借助于 redux 中间件实现异步数据处理，redux 异步中间件较多，像 `redux-promise`、`redux-thunk`、`redux-saga` 等中间件。这里使用更为简单的 `redux-thunk` 作为中间件实现状态管理的异步操作。

### 11.1 安装

​	如果 `redux` 的版本是 5.x 则 `redux-thunk` 的版本是 3.x 版本，否则会因为版本不兼容问题报错，而无法正常安装。会报错，因为在 package.json 设置了 `peerDevDependencies` 属性配置

```bash
npm i -D redux-thunk@2.x
```

### 11.2 使用

```ts
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk'
import { rootReducer } from './reducer';
// 开发工具
const { _REDUX_DEVTOOLS_EXTENSION_: devTool, __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: devCompose } = window;
const composeEnhancers = typeof window === 'object' && devCompose ? devCompose({}) : compose;
// 使用 applyMiddleware 函数使用中间件
const store = createStore( rootReducer, composeEnhancers(
  applyMiddleware( reduxThunk )
));
export default store;
```

​	在项目中通过调用异步函数调用异步 action。如下所示：

```tsx
// 中间件将 dispath 和 getState 函数传递给下一级
export const initAsync = (data) => (dispath, getState ) => {
  const { common: { initData } } = getState();
  setTimeout(() => {
    dispath({
        type: 'COMMON/INIT',
        data: {}
    });
  }, 1000 )
}
```

​	在项目中建议，对 action 和 reducer 等做相关的优化，适合书写即可。vuex 是基于 redux 开发，对 redux 做了二次封装，因此模块管理约定了相关规则。而react-redux 并未约束相关规则，用户可以通过自己的书写习惯灵活进行编写状态管理逻辑。

## 12. axios

​	通过 axios 完成与服务端的接口调用，axios 实例提供了各种请求方法和表单请求，也提供了取消请求的相关方法，[参考文档](https://www.axios-http.cn/docs/api_intro) 。

### 12.1 安装

```bash
npm i -S axios # 安装 axios 
```

## 13. JSON to ts

​	安装 `JSON to ts` vscode 插件，选中之后执行快捷键 `Shift + Ctrl + Alt + S` 快速将 json 转成类型接口。

## 14. 理由守卫

​	在 react 中没有路由守卫，需要手动实现路由守卫的功能，主要通过重定向的方式实现路由的跳转。实现起来比 `vue-router` 更灵活方便。如下所示：

```tsx
import { useEffect } from 'react';
import { useRoutes, useLocation, useNavigate } from 'react-router-dom'
import router from '@/router'
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
```

