# react-router

## 1. 创建项目

```bash
# 在当前目录下创建项目
npm init vite ./ 
```

​	然后，按照提示操作即可， 选择 react + ts。

## 2. 路由创建流程

​	首先，在根组件使用 `BrowserRouter` 或者 `HashRouter` 组件包裹，然后通过 Route 组件相关的参数通过地址映射路由视图页面。

```tsx
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
)
```

​	在入口的组件中使用 `Route` 组件渲染路由组件。path：路由地址，component：视图组件。Route 组件的 path 是从头开始匹配，如下所示：`/about`不仅渲染了 About 组件也渲染了 Home 组件 。可以通过 exact：配置完整匹配，精确匹配路径。

```tsx
import { Route } from "react-router-dom";
import { Home } from "./views/Home";
import { About } from "./views/About";
function App() {
  return(
    <div className="app">
      <Route exact path='/' component={ Home }></Route>
      <Route path='/about' component={ About }></Route>
    </div>
  ) 
}
export default App;
```

## 3. 路由组件

### 3.1 Link

​	路由跳转组件，用来切换路由视图。用法如下：

```tsx
const Menu = () => {
  return (
    <ul>
      <li><Link to='/'>home</Link></li>
      <li><Link to='/about'>about</Link></li>
    </ul>
  )
}
```

### 3.2 NavLink

​	主要用于动态导航渲染，高亮显示，当组件命中导航之后，动态设置高亮样式。通过 `activeClassName` 属性控制高亮， 如下所示：

```tsx
import { NavLink } from "react-router-dom";
import styles from './index.module.css';
export const FNavLink = () => {
  return (
    <ul>
      <li><NavLink to='/' activeClassName={ styles.active } exact >home</NavLink></li>
      <li><NavLink to='/about' activeClassName={ styles.active }>about</NavLink></li>
    </ul>
  )
}
```

​	`Link` 组件与 `NavLink` 组件的主要区别是 NavLink 可以通过自己的属性 `activeClassName` 动态的映射路径改变导航样式。

### 3.3 Route 

#### 3.3.1 选项参数

 	route 组件用来设置路由，RouteProps 数类型和方法：

```tsx
export interface RouteProps<
    Path extends string = string,
    Params extends { [K: string]: string | undefined } = ExtractRouteParams<Path, string>,
> {
    location?: H.Location | undefined;
    component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any> | undefined;
    render?: ((props: RouteComponentProps<Params>) => React.ReactNode) | undefined;
    children?: ((props: RouteChildrenProps<Params>) => React.ReactNode) | React.ReactNode | undefined;
    path?: Path | readonly Path[] | undefined; // 路由路径
    exact?: boolean | undefined; // 是否为精确匹配
    sensitive?: boolean | undefined; // 大小写是否敏感
    strict?: boolean | undefined;
}
```

​	**render：**需要手动传路由信息传给视图组件

```tsx
// render，需要手动传路由信息传给视图组件
<Route path="/student/:id" render={ (props) => <Student { ...props } /> }></Route> 
```

​	**component：**直接使用导入的组件

```tsx
// component 自动将路由信息通过 props 传给视图页面
<Route path="/student/:id" component={ Student }></Route>
```

**children：**children 与 render 类似，无论路由匹不匹配都会渲染，通过会点函数获取路由信息

```tsx
// children 与 render 类似，无论路由匹不匹配都会渲染，通过会点函数获取路由信息
<Route path="/student/:id" children={ (props) => <Student { ...props } /> }></Route>
// 通过钩子函数获取路由信息
<Route path="/student/:id" children={ <Student /> }></Route>
```

 	**子组件：**route 子组件与 children 属性用法基本一致

```tsx
// 在 Student 自动将路由信息通过 props 传给视图页面
<Route exact path='/student'> { Student }</Route>
// 通过钩子函数获取路由信息
<Route exact path='/student'> <Student /> </Route>
// 通过函数方式渲染子组件
<Route exact path='/student'> { (props) => <student { ...props } />} </Route>
```

#### 3.3.2 路由嵌套

​	route 是可以嵌套的组件，不仅可以嵌套在 route 组件内，也可以写在子组件内部。嵌套路由的父路由不能再使用 component render children 属性的渲染方式，组件渲染需要统一使用标签并以子组件的形式渲染，另外，必须保证父路由成功渲染子路由才会渲染，如下所示：

```jsx
<Route path='/about'>
  <About />
  <Route exact path='/about/detail'>
      <Detail />
  </Route>
</Route>
```

​	注意在父路由不能使用 exact 属性，否则在访问子路由路径的时候无法显示，因为子路径命中后，就不能命中父路径了，所以父组件就渲染，子路由组件就更无法渲染了。

​	在视图中定义子路由：

```tsx
// 在组件中定义子路由
const About = () => {
  return (
    <>
      <div>hello about!</div>
      <input type="text" />
      <Route exact path='/about/detail'>
        <Detail />
      </Route>
    </>
  )
}
// 父路由
<Route path='/about'>
  <About />
</Route>
```

### 3.4 Prompt

​	在路由调整前触发，确认之后跳转路由，用于表单路由页面拦截。message，提示信息。when 为 true 时，启动提示拦截，否则不提示。

```tsx
import { Prompt } from "react-router-dom"
export const Form = () => {
  return (
    <>
      <input type="text" />
      <Prompt message={ '将要离开页面，确认吗？' } when={ false }></Prompt>
    </>
  )
}
```

### 3.5 Redirect 

​	重定向组件，自动重定向页面，用于跳转页面，也可以使用 useHistory 使用的是 replace 方式实现的组件。默认是 replace 也可以使用属性 push

```tsx
<Redirect to="/form"></Redirect>
<Redirect to="/form" push></Redirect>
// 访问 abc 页面，重定向到 form 路由页面
<Redirect from="/abc" to="/form" push></Redirect>
```

### 3.6 Switch

​	将每一条路由单独渲染，否则所有的 Route 都会同时渲染在一个视图上，也就是说 Switch 保证了配置的每一个 Route 组件独立渲染互不干扰。

## 视图组件

​	RouteComponentProps 接口包含如下信息：

```ts
// RouteComponentProps
export interface RouteComponentProps<
    Params extends { [K in keyof Params]?: string } = {},
    C extends StaticContext = StaticContext,
    S = H.LocationState,
> {
    history: H.History<S>; // 
    location: H.Location<S>; // 当前地址信息 
    match: match<Params>; // 匹配的信息
    staticContext?: C | undefined;
}
```

​	视图组件 About 通过 props 获取路由参数，history/location/match/staticContext 

```tsx
import { RouteComponentProps } from "react-router-dom";
export const About = (props: RouteComponentProps) => {
  console.log( props ); // 
  return (
    <>
      <div>hello about!</div>
      <input type="text" />
    </>
  )
}
```

​	**props.match** 接口，路由匹配信息：

```ts
export interface match<Params extends { [K in keyof Params]?: string } = {}> {
    params: Params; // 动态路由参数即 path 配置后面的占位属性 :id
    isExact: boolean; // 路径是否完全匹配
    path: string; // 配置的 path，如配置路径是 /home/:id
    url: string; // 实际路径 /home/123
}
```

​	**props.location** 接口，路由地址信息

```tsx
export interface Location<S = LocationState> {
    pathname: Pathname; // 路径信息
    search: Search; // 查询值
    state: S; // 额外参数，原生 history 模式中的 state 对应，可以传任意参数
    hash: Hash; // hash
    key?: LocationKey | undefined;
}
```

