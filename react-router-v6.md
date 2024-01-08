## 1. 文档说明

​	笔记基于 vite 构建工具，探讨和研究 `react-router-dom@6.x` 相关的 api 和 实现路由导航的基本逻辑。并通过不同的方式实现单页导航的路由页面。

## 1. 安装

```bash
npm init vite@5.0.8
```

​	按照安装提示，选择 react + ts 选项即可。不建议使用 `git bash` ，在命令选择时存在 bug，无法进行上下选择。一路按提示操作即可，然后进入项目目录，如果创建错了，删除之后，从新创建项目即可。

## 2. 配置路径别名

​	修改 `vite.config.ts` 配置文件，与 vue/cli 配置基本一致。

```tsx
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'node:path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

​	因为使用了 ts ，所以在使用第三方模块 node 需要安装 `@types/node` 否则类型检测报错。安装如下：

```bash
npm i -D @types/node
```

​	同样，在 ts 环境中使用别名路径，也需要在 tsconfig.json 配置文件中配置，否则 ts 无法识别别名路径。配置如下:

```json
{
  "compilerOptions": {
	// path alias
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

## 3. 配置路由

​	创建路由有三种方式，分别是 `createBrowserRouter` 、`createHashRouter`、 `createMemoryRouter` 与 `vue-router` 基本一致。不建议使用对应的组件创建路由也就是组件式的方式创建路由，组件路由对应也有三个组件分别是 `BrowserRouter` 、`HashRouter` 、`MemoryRouter` 。如果路由未使用承载路由的位置则路由视图默认渲染在根位置。

### 3.1 方式一

​	在 v6 版本支持直接通过配置文件配置路由，之前的版本仅能通过路由相关的组件控制路由，配置方式与  `vue-router` 类似。通过如下两个简单的步骤即可实现路由的挂载和渲染。

​	第一：通过 `createBrowserRouter` 创建路由实例。

```tsx
import { createBrowserRouter } from "react-router-dom";
export const routes = [{
  path: '/',
  element: <h1>hello react-router v6</h1>
}];
export const router = createBrowserRouter( routes );
```

​	第二：通过路由组件 `RouterProvider` 承载路由。

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { router } from '@/router'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={ router }></RouterProvider>
  </React.StrictMode>,
);
```

​	与 vue-router 一样，同样需要配置指定的根路由，其他路由均为当前路由的子视图页面。如下所示：

```tsx
export const routes = [
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/home",
        element: <h1>我是路由页面</h1>,
      },
    ],
  }
];
```

### 3.2 配置路由错误页面

​	配置路由的错误页面通过在根路由配置选项参数 `errorElement` 指定错误的页面组件即可，路由找不到等会直接抛出异常。

```tsx
import { FC, ReactNode } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import Root from "@/components/Root";
import ErrorPage from "./../error-page";
export const routes: Array<RouteObject> = [
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
  },
];
export const router = createBrowserRouter(routes);
```

### 3.3 配置动态路由

​	可以通过 `:params?` 配置动态路由参数，这一点 `vue-router` 基本一致。然后通过路由钩子函数，`useParams` 获取动态路由参数。

```tsx
import { createBrowserRouter, RouteObject } from "react-router-dom";
export const routes: Array<RouteObject> = [
  {
    path: 'contacts/:id?',
    element: <div></div>
  }
];
export const router = createBrowserRouter(routes);
```

​	在视图组件中通过 `useParams` 获取动态路由字段数据。

```tsx
const View = () => {
  const params = useParams();
  return <div>{params.id}</div>
}
```

## 4. 嵌套路由

​	嵌套路由需要在配置文件中配置选项参数 `children` 子路由参数配置与父路由参数配置基本一致。需要在父路由中指定视图渲染位置，使用内置组件 `Outlet` 组件。子路由的 path 不以斜线 `'/'` 开头，默认会自动拼接上一级（父级）path。

```tsx
import { createBrowserRouter, RouteObject } from "react-router-dom";
import Root from "@/components/Root";
import Contact from '@/view/Contact';
export const routes：Array<RouteObject> = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: '/contacts/:id?', // 根路径可以不写
        element: <Contact />,
      },
    ]
  }
]
export const router = createBrowserRouter(routes);
```

## 5. Link 组件

​	路由跳转的两种方式，一种是使用编程式，一种是声明式。使用 Link 组件跳转是声明式写法，用于路由页面的跳转。

```tsx
import { Outlet, Link } from 'react-router-dom';
export default function Root() {
  return <Link to="/contacts/1">Your Name</Link>
}
```

## 6. 路由配置项

### 6.1 loader

​	loader 是在路由加载之前执行，也是在组件渲染之前执行。如果在 loader 里面执行的是异步函数，路由渲染会在异步数据返回之后，才会渲染。建议 loader 函数与路由页面卸载同一个模块便于管理。然后再路由中配置 loader 函数，在路由页面中使用 `useLoaderData` 钩子函数调用即可拿到 loader 函数返回的数据。

```tsx
// 在 root 组件中使用 loader
export const loader = (): Promise<object> => {
  console.log( 'root loader' );
  return new Promise( (resolve, reject) => {
    setTimeout( () => {
      resolve({
        name: 'lantian',
        sex: '男'
      });
      console.log( 'root can render' );
    }, 1000 );
  })
}

const Root = () => {
  console.log( 'root loadered' );
  const data = useLoaderData();
  return (
    <>
      {/* 代码省略 */}
    </>
  );
}
export default Root
```

​	将路由文件和 loader 函数导入 路由配置文件，完成对应的配置。

```tsx
import { createBrowserRouter, RouteObject } from "react-router-dom";
import Root, { loader as rootLoader} from "@/components/Root";
export const routes: Array<RouteObject> = [
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    // 省略其他代码
  }
];
export const router = createBrowserRouter(routes);
```

## 7. 路由参数配置说明

```tsx
interface RouteObject {
  path?: string;
  index?: boolean; // 是否为默认路由
  children?: React.ReactNode;
  caseSensitive?: boolean; // 是否区分大小写
  id?: string; // 路由唯一标识
    
  loader?: LoaderFunction;
  action?: ActionFunction;
  // 组件
  element?: React.ReactNode | null;
  Component?: React.ComponentType | null;
  // 捕获路由报错
  errorElement?: React.ReactNode | null;
  ErrorBoundary?: React.ComponentType | null;
  // SSR  
  hydrateFallbackElement?: React.ReactNode | null;
  HydrateFallback?: React.ComponentType | null;
  
  handle?: RouteObject["handle"]; // 有用的函数，可以通过函数处理任意逻辑
  shouldRevalidate?: ShouldRevalidateFunction;
  lazy?: LazyRouteFunction<RouteObject>;
}
```

### 7.1 ErrorBoundary 与 errorElement

​	`ErrorBoundary` 与 `errorElement` 功能是一样的，只是在配置的时候有所区别，均是捕获路由异常的选项参数。两者任何一个均可以，可以满足不同的需求。在组件中通过 `useRouteError` 钩子处理路由错误信息。

```tsx
import { createBrowserRouter, Navigate, RouteObject, useRouteError, ErrorResponse } from "react-router-dom";
const ErrorPage = () => {
  const { statusText, message } = useRouteError() as ErrorResponse & Error;
  return <div>你确定有这个页面？<span>{statusText || message}</span></div>
}
export const routes: Array<RouteObject> = [
  {
    path: "/",
    // errorElement: <ErrorPage></ErrorPage>,
    ErrorBoundary: ErrorPage,
    element: <Navigate to='/contacts'></Navigate>,
  }
];
export const router = createBrowserRouter(routes);
```

### 7.2 element 与 Component

​	`Component` 与 `element` 功能是一样的，只是在配置的时候有所区别，均是捕获路由异常的选项参数。两者任何一个均可以，可以满足不同的需求。

```tsx
import { createBrowserRouter, RouteObject } from "react-router-dom";
const Home = () => <div>我是首页</div>;
const routes: Array<RouteObject> = [{
  path: "/",
  element: <Home></Home>,
  Component: Home
}];
router = createBrowserRouter(routes);
```

### 7.3 loader

​	用于处理异步数据，常用与服务端交互等。loader 函数处理异步数据，并在异步函数结束后渲染路由页面，在路由页面中通过 `useLoaderData` 获取 loader 函数返回的数据，同时 `useMatches` 钩子函数也可以通过 data 属性获取 loader 数据。loader 函数参数类型 `LoaderFunctionArgs` 。

```tsx
// 在 root 组件中使用 loader
export const loader = (): Promise<object> => {
  console.log( 'root loader' );
  return new Promise( (resolve, reject) => {
    setTimeout( () => {
      resolve({
        name: 'lantian',
        sex: '男'
      });
      console.log( 'root can render' );
    }, 1000 );
  })
}
const Root = () => {
  console.log( 'root loadered' );
  const data = useLoaderData(); // 获取 loader 数据
  return (
    <>
       {/* 代码省略 */}
    </>
  );
}
export default Root
```

​	如果在 loader 中需要处理多个异步任务，获取多个不同的数据，可以通过 `react-router-dom` 提供的 `defer` 方法实现多种不同的异步数据处理，在同一个 loader 中处理，非常适合系统初始化请求时调用多个接口的场景。如下所示：

```tsx
import { defer } from 'react-router-dom';
const resolve = (d: string, ms: number) => new Promise( resolve => setTimeout(() => resolve(`${d} - ${rand()}`), ms));
export async function deferredLoader() {
  return defer({
    critical1: await resolve("Critical 1", 1000),
    critical2: await resolve("Critical 2", 1000),
    lazyResolved: Promise.resolve("Lazy Data immediately resolved - " + rand()),
    lazy1: await resolve("Lazy 1", 1000),
    lazy2: resolve("Lazy 2", 1500),
    lazy3: resolve("Lazy 3", 10000),
    lazyError: reject(new Error("Kaboom!"), 2500),
  });
}
```

​	另外，组件在渲染异步数据时，如上面被 defer 封装后的异步数据，可以通过异步组件渲染异步数据，主要是通过 react 中的 `Suspense` 和 react-router-dom中的 `Await` 两个组件，使用 `useAsyncError` 、`useAsyncValue` 两个钩子函数分别捕获错误和异步数据如下所示：

```tsx
import React from 'react';
import { defer, Await, useAsyncError, useAsyncValue } from 'react-router-dom'; 
const AsyncComponent = () => {
  return (
	  <React.Suspense fallback={<p>loading 3...</p>}>
      <Await 
        resolve={ data.lazy3 }
        errorElement={ <RenderAwaitedError /> }
       >{(data: string) => <p>{data}</p>}</Await>
    </React.Suspense>	
  )
}
const RenderAwaitedError = () => {
  // 获取异步报错组件信息
  let error = useAsyncError() as Error;
  return (
    <p style={{ color: "red" }}>
      Error (errorElement)!
      <br />
      {error.message} {error.stack}
    </p>
  );
}
const RenderAwaitedData = () => {
  // 获取异步数据
  let data = useAsyncValue() as string;
  return <p>{data}</p>;
}
```

### 7.4 action

​	action 是一个用户交互行为，如提交数据等。在通过 Form 表单提交数据时，可以通过 配置 action 函数获取相关参数，并校验参数，调接口，重定向页面等逻辑。

​	第一种方式：通过 form 表单的形式实现登录的逻辑

```tsx
import { useActionData, Form, redirect, ActionFunctionArgs } from "react-router-dom";
export default function FormComponent() {
  const errors = useActionData() as Errors;
  return (
    <Form method="post">
      <p>
        <input type="text" name="email" />
        {errors?.email && <span>{errors.email}</span>}
      </p>

      <p>
        <input type="text" name="password" />
        {errors?.password && <span>{errors.password}</span>}
      </p>

      <p>
        <button type="submit">登录</button>
      </p>
    </Form>
  );
}

// 路由配置中的 action 
export async function action({ request, params }: ActionFunctionArgs ) {
  const formData = await request.formData(); // 获取表单数据
  const email = formData.get("email");
  const password = formData.get("password");
  const errors: Errors = {}; // 捕获错误信息
  if (typeof email !== "string" || !email.includes("@")) {
    errors.email = "邮件格式错误";
  }
  if (typeof password !== "string" || password.length < 6) {
    errors.password = "密码长度不能小于6";
  }
  if (Object.keys(errors).length) {
    return errors;
  }  
  await fetch( url); // 调接口
  // 登录成功，重定向到首页
  return redirect("/index"); 
}
```

​	第二种方式：不使用 Form 表单组件而是使用 `useSubmit` 作为钩子函数，模拟 Form 表单数据提交。

```tsx
export default () => { 
  const submit = useSubmit();
  const [ name, setName ] = useState<string>( '' );
  const handleChage = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)
  const handleAdd = () => {
    const id = Date.now().toString(32);
    const data = { id, name, type: 'add' };
    submit( data, {
      method: "post", // form 表单的属性
    });
  }
  return(
  	<div>
      <input type="text" onInput={ handleChage } value={ name } />
      <button onClick={ handleAdd }>add</button>
    </div>
  )
}
// 路由 action 配置项 
const actionSubmit = async ({ request, params }: ActionFunctionArgs) => {
	const formData = await request.formData();
    const type = formData.get("type");
 	if ( type === "add") {
      // 新增
 	}else if( type === 'delete' ) {
      // 删除
    }
    // 回调成功后会触发当前页面的 useNavigation();
 	return {};
}
```

​	在 action 触发完成后，会触发路由页面中的钩子函数 `useNavigation` 并且包含如下数据类型：

```tsx
export type NavigationStates = {
  Idle: {
    state: "idle"; // action 成功返回的标志
    location: undefined;
    formMethod: undefined;
    formAction: undefined;
    formEncType: undefined;
    formData: undefined;
    json: undefined;
    text: undefined;
  };
  Loading: {
    state: "loading";
    location: Location;
    formMethod: Submission["formMethod"] | undefined;
    formAction: Submission["formAction"] | undefined;
    formEncType: Submission["formEncType"] | undefined;
    formData: Submission["formData"] | undefined;
    json: Submission["json"] | undefined;
    text: Submission["text"] | undefined;
  };
  Submitting: {
    state: "submitting"; // form 表单提交中
    location: Location;
    formMethod: Submission["formMethod"];
    formAction: Submission["formAction"];
    formEncType: Submission["formEncType"];
    formData: Submission["formData"];
    json: Submission["json"];
    text: Submission["text"];
  };
};
```

​	然后，拿到这些数据后在组件中处理相关的状态，如 loading，错误信息等。

```tsx
import { useId, useState, ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react';
import { ActionFunctionArgs, useNavigation, useSubmit } from 'react-router-dom';
export default () => { 
  const submit = useSubmit();
  const [ name, setName ] = useState<string>( '' );
  const handleChage = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)
  const handleAdd = () => {
    const id = Date.now().toString(32);
    const data = { id, name, type: 'add' };
    submit( data, {
      method: "post", // form 表单的属性
    });
  }
  // 
  useEffect(() => {
    if (navigation.formData?.get("action") === "add") {
      
    } else if (navigation.state === "idle") {
      // action 完成 
    }
  }, [navigation]);
  return(
  	<div>
      <input type="text" onInput={ handleChage } value={ name } />
      <button onClick={ handleAdd }>add</button>
    </div>
  )
}
```

### 7.5 handle

​	handle 参数是一个编程的口子，可以实现任何配置项无法实现的逻辑。可以是函数，可以是对象等，辅助处理复杂的业务逻辑。需要配合钩子函数 `useMatches` 。数据类型如下：

```tsx
interface Json {
  [index: string]: any
}
interface Type<T=()=>any>{
  id: string;
  pathname: string;
  data?: Json[]; // loader 函数返回的数据
  params: Json;
  handle: T; // 可以是任意类型的数据
}
```

​	在组件中使用 `useMatches` 获取路由参数，可以用于面包屑渲染等。

```jsx
function Breadcrumbs() {
  let matches = useMatches<Type[]>();
  return ();
}
```

### 7.6 lazy

​	用于加载路由内部的代码，如函数或者其他相关的业务逻辑，用于分割代码，当然也可以使用 `React.lazy( () => import(''))` 异步加载代码。

### 7.7 shouldRevalidate

```tsx
interface ShouldRevalidateFunction {
  (args: ShouldRevalidateFunctionArgs): boolean;
}
interface ShouldRevalidateFunctionArgs {
  currentUrl: URL;
  currentParams: AgnosticDataRouteMatch["params"];
  nextUrl: URL;
  nextParams: AgnosticDataRouteMatch["params"];
  formMethod?: Submission["formMethod"];
  formAction?: Submission["formAction"];
  formEncType?: Submission["formEncType"];
  text?: Submission["text"];
  formData?: Submission["formData"];
  json?: Submission["json"];
  actionResult?: any;
  defaultShouldRevalidate: boolean;
}
```

## 8. hooks

### 8.1 useHref

​	`useHref` 钩子返回一个URL，该 URL 可用于链接到给定位置, 可以拼接指定的路径。

```tsx
// 当前路由 /home
const href = useHref(''); // 返回： /home
const href = useRef('name'); // 返回：/home/name
```

函数类型接口：

```tsx
export type RelativeRoutingType = "route" | "path";
export declare function useHref(to: To, { relative }?: {
  relative?: RelativeRoutingType;
}): string;
```

