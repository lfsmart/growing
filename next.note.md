# nextjs

> next.js 在服务端是如何运行的
>
> Next.js 在服务端运行时，它充分利用了Node.js环境来进行服务器端渲染（Server-Side Rendering, SSR）和静态站点生成（Static Site Generation, SSG）。以下是Next.js在服务端大致的工作流程：
> 1. **路由处理**： 当用户向服务器发送HTTP请求时，Next.js 的内置服务器（Koa.js为基础）接收到请求，并根据请求的URL映射到相应的页面文件。这些页面文件位于项目中的`pages`目录下，文件名和路径决定了URL路由。
> 2. **数据获取**： 如果页面组件使用了`getServerSideProps`或`getStaticProps`，这些函数将在服务端运行，异步获取页面所需的动态数据。数据来源可以是数据库查询、API调用或其他外部资源。
> 3. **服务器端渲染**： 获取到数据后，Next.js使用ReactDOM.server.renderToString或ReactDOM.server.renderToStaticMarkup方法将React组件转化为HTML字符串。这个过程确保了浏览器在接收到响应时，能够直接呈现带有数据填充的完整页面。
> 4. **生成HTML响应**： 结合生成的HTML、CSS（通过CSS-in-JS库如styled-components或emotion处理）和JavaScript（通常是React组件的bundle），Next.js构建一个完整的HTML响应。其中，JavaScript负责在客户端启动后接管页面，实现SPA（单页应用）的交互体验。
> 5. **动态路由与API路由**： 对于动态路由（如`pages/posts/[id].js`），Next.js能够在服务端解析请求路径参数并传入对应的组件。同时，Next.js还支持定义API路由（在`pages/api`目录下创建文件），用于处理RESTful API请求。
> 6. **静态资源处理**： Next.js自动处理静态资源，如图片、字体和其他静态文件，确保它们可以从正确的服务器路径获取。
> 7. **缓存与优化**： Next.js对数据和页面渲染结果进行了优化，例如通过缓存中间结果来提高性能，尤其是在SSG模式下，生成的静态页面可以被CDN缓存以进一步加速用户访问。

## 1. 安装

```bash
npx create-next-app@14.0.4 # 使用的是最新的版本
```

![image-20240117151309991](C:/Users/user/AppData/Roaming/Typora/typora-user-images/image-20240117151309991.png)

## 2. 目录结构

​	next 路由系统是基于文件系统的，采用的是约定式的方式。路由页面需要指定 page 文件，如果有子路由则需要指定 layout 页面。如果有接口需要指定 使用 route 文件定义接口。为了区分在实践中，约定如下

-  `_components`: 存放通用组件，这些组件不会直接与路由页面关联。
- `_lib`: 存放通用函数库或工具函数。
- `_middleware`: 自Next.js 12开始引入的中间件文件夹，其中的文件用于处理Next.js请求生命周期，但它们本身并不是路由。

```
.
|-- README.md
|-- app
|   |-- dashboard
|   |   |-- analytics
|   |   |   `-- page.tsx
|   |   |-- layout.tsx
|   |   |-- page.tsx
|   |   `-- settings
|   |       `-- page.tsx
|   |-- layout.tsx
|   `-- page.tsx
|-- next-env.d.ts
|-- next.config.ts
|-- package-lock.json
|-- package.json
|-- postcss.config.js
|-- public
|   |-- next.svg
|   `-- vercel.svg
|-- tailwind.config.js # 第三方样式
`-- tsconfig.json
```

### 2.1 顶级文件夹

| [`app`](https://nextjs.org/docs/app/building-your-application/routing) | App Router                 |      |
| ------------------------------------------------------------ | -------------------------- | ---- |
| [`pages`](https://nextjs.org/docs/pages/building-your-application/routing) | Pages Router               |      |
| [`public`](https://nextjs.org/docs/app/building-your-application/optimizing/static-assets) | Static assets to be served |      |

### 2.2 顶级文件

## 3. 路由

### 3.1 路由的约定

​	next 是采用约定式路由定义视图页面的，路由有创建的文件决定。如下图所示：

![Terminology for Component Tree](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fterminology-component-tree.png&w=3840&q=75&dpl=dpl_48oNJS5BFcpzrgy9nvGYCkyvBDXL)

​	在页面中通过如下访问即可

![Terminology for URL Anatomy](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fterminology-url-anatomy.png&w=3840&q=75&dpl=dpl_48oNJS5BFcpzrgy9nvGYCkyvBDXL)

​	next 路由是与 app 目录下子目录对应的，目录的路径即为页面访问路径，页面约定文件名文 page，布局文件名约定 layout。app 根目录的 layout 和 page 对应网站根目录。

```tsx
export default ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      Hello dashboardLayout 
      <div> { children } </div>
    </div>
  )
}
```

- layout 是布局页面，也就是导航或其他全局组件，里面有视图页面承载占位符 `Outlet` 或者 vue-router 中的 `router-view`，在目录下必须存在。一般情况一个页面只有在根目录下有一个 layout 文件，作为路由视图的渲染位置。当然如果有子路由页面就需要在子路由页面添加新的 layout 文件。
- page 是视图页面，文件系统中的路由页面必须有 page 文件，page 即为视图渲染的位置也可以理解为 Outlet 占位符渲染的位置。如果 template 文件存在，page 会被渲染到 template， 页面渲染都在服务端进行，不要在 page 页面中使用客户端 的工具和方法，如果需要使用的话，单独抽离出来作为一个客户端渲染模块
- template 是模版，被渲染在 layout 中，包裹着 page。

​	在 next@12.x 版本之前，使用的是 page router 页面路由约定在 pages 文件目录下，如果 App router 与 page router 同时存在则优先渲染 App router 下面的路由。

### 3.2 链接和导航

| 属性参数               | 功能                                                 | 备注 |
| ---------------------- | ---------------------------------------------------- | ---- |
| Link.href<string>      | 跳转到页面，并具备 html 锚点功能                     |      |
| Link.scroll<boolean?>  | 控制路由切换页面是否需要滚动，默认回到顶部，即不滚动 |      |
| Link.replace<boolean?> | 是否替换上一页面，默认不替换即 push                  |      |

​	也可以使用 useRouter() 钩子函数实现，在使用钩子函数的时候需要声明是否为 客户端渲染通过指令 `'use client'` 写在文件顶部，因为服务端是不支持 DOM 事件等，如果需要跳转页面，服务端需要使用  redirect 函数。如下所示：

```tsx
import { useRouter, redirect, RedirectType } from 'next/navigation'
 redirect( '/dashboard/settings#b', RedirectType.replace ); // RedirectType enum push or replace
```

### 3.3 动态路由

​	动态路由，通过 `[id]` 定义目录，在该目录下定义 page 文件即可。

```tsx
// 类型接口定义
declare interface Params {
  [key: string]: string | string[];
}
declare interface RouteProps {
  params: Params,
  searchParams: URLSearchParams
}
```

动态路由页面定义，如下所示：

```tsx
// 前端和服务端均可以执行
export default ({ params, searchParams }:  RouteProps) => {
  return <div>我是 postList 的 id={ params.id }</div>
}
```

​	路由参数也可以通过  `'next/navigation'` 模块中的 `useParams` 和 `useSearchParams` 。该钩子只能在客户端执行，因此需要加上客户端指令。

```tsx
'use client' // 客户端指令
import { useParams, useSearchParams } from 'next/navigation';
export default () => {
  const params = useParams();
  const searchParams = useSearchParams();
  return <div>我是 postList 的 id={ params.id }</div>
}
```

### 3.4 路由分组

​	使用 `(folderName)` 定义文件目录，为分组理由，里面的路由页面将共用分组目录下的布局。如下所示，about 和 goods 路由页面会被渲染在admin 分组下，方便路由管理。分组目录没有 page 文件，[路由分组文档参考](https://nextjs.org/docs/app/building-your-application/routing/route-groups) 。

![image-20240119161401323](C:/Users/user/AppData/Roaming/Typora/typora-user-images/image-20240119161401323.png)

### 3.5 监听路由

​	监听路由变化可以通过钩子函数 `usePathname` 监听。如下所示：

```tsx
import { usePathname, useRouter } from 'next/navigation'
const pathname = usePathname(); // 也可以用于设置默认 state 
export default () => {
    useEffect(() => {
        // pathname 处理变换后的逻辑 
    }, [pathname])
    return <div></div>
} 
```



## 4. metadata

​	设置网页 head 信息，通过 Metadata。分为两种形式，一种是静态，一种动态，即异步。[请查看官方文档](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) 如下所示：

### 4.1 动态设置

​	通过约定函数 generateMetadata 函数异步实现动态设置 head 信息。

```tsx
import { Metadata } from "next"
export const generateMetadata = async (props: RouteProps): Promise<Metadata> => {
  return {
    title: `这是详情页-${props.params.id}`,
  }
}
export default ({ params, searchParams }:  RouteProps) => {
  return <div>我是 postList 的 id={ params.id }</div>
}
```

### 4.2 静态设置

```tsx
import { Metadata } from "next"
export const metadata: Metadata = {
  title: 'next.js',
  description: '这是详情页',
}
export default ({ params, searchParams }:  RouteProps) => {
  return <div>我是 postList 的 id={ params.id }</div>
}
```

​	无论是静态或是动态设置 head 信息都需要使用约定的字段和函数，并通过export 将函数或变量导出，否则设置不起作用。如静态需要导出变量 `metadata`，动态需要使用 `generateMetadata` 函数。

## 5. api

### 5.1 接口约定

​	定义服务端接口，在 App 目录中定义 api 目录作为接口目录或者其他目录名称如 apis 等均可以只是路由的命名空间，接口约定为 route 文件。如果是动态接口，则可以使用 `[param]` ，与动态路由命名方式一致。如下所示：

![image-20240119174955290](C:/Users/user/AppData/Roaming/Typora/typora-user-images/image-20240119174955290.png)

​	**接口定义：**

```ts
// 定义接口
import { NextRequest, NextResponse } from 'next/server'
export const GET = (req: NextRequest, { params }: any) => {
  return NextResponse.json({
    success: true,
    errorMessage: '获取单条记录' + params.id,
    data: {},
  })
}
```

​	**接口调用：** 通过 fetch 直接调用定义的接口。

```tsx
'use client';
import { useState, useEffect } from "react";
interface Item {
  id: number;
  name: string;
}
export const List = () => {
  const [ data, setData ] = useState<Item[]>([]);
  useEffect( () => {
    fetch( '/api/goods').then( (res) => res.json()).then( ({ data }) => {
      setData( data );
    })
  });
  return <div className="list">
    <ul>
      { data.map( item => <li className="item" key={ item.id }>{ item.name }</li>)}
      <li></li>
    </ul>
  </div>
}
```

​	在调用的时候由于 react@18.2.x 版本测试环境调用了两次，所以 next 在执行 useEffect 中的接口时也是执行了2次，可以在 next.config.js 配置文件中关闭 如下所示：

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false
}
module.exports = nextConfig
```

## 6. 数据库

### 6.1 prisma 框架

​	[官网链接](https://www.prisma.io/docs/getting-started/quickstart)

```bash
npm install prisma --save-dev # prima
npx prisma init --datasource-provider sqlite # 初始化数据库
```

### 6.2 model

 	定义数据模型，在 prisma 初始化之后生成的 prisma 文件目录下，创建 `./prisma/schema.prisma` 中定义数据模型，定义如下：

```sqlite
-- 文件类型为 prisma
-- This is your Prisma schema file,
-- learn more about it in the docs: https://pris.ly/d/prisma-schema
generator client {
  provider = "prisma-client-js"
}
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
model Goods {
  id String @id @unique @default(uuid())
  name String
  desc String @default("")
  content String @default("")
  createAt DateTime @default(now()) @map("create_at")
  updateAt DateTime @updatedAt @map("update_at")
  @@map("products")
}
```

​	模型创建完成后，使用命令创建数据库，执行如下命令：

```bash
npx prisma db push 
```

### 6.3 数据库连接

​	在项目根目录下，创建 `./db.ts` 文件，用于数据库连接，[官方文档说明](https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices#solution) 。

```typescript
import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
```

​	数据库连接文件使用了新的第三方包，需要安装 @prisma/client。

```bash
npm i -D @prisma/client
```

​	使用 prisma 查询数据库，实现新增商品和查询商品列表的接口，如下所示：

```typescript
import { NextRequest, NextResponse } from "next/server"
import prisma from '@/db';
export const GET = async () => {
  const data = await prisma.goods.findMany({
    orderBy: {
      createAt: 'desc'
    }
  });
  return NextResponse.json({
    success: true,
    errorMessage: '',
    data
  })
}

export const POST = async ( req: NextRequest ) => {
  const data = await req.json();
  await prisma.goods.create({
    data
  });
  return NextResponse.json({
    success: true,
    errorMessage: '创建成功',
    data: {}
  })
}
```

## 7. antd

### 7.1 安装

```bash
npm i -S antd
```

​	在使用 antd 前端页面需要客户端指令 `use client` 否则报错。如下登录页面：

```tsx
'use client' // 客户端指令
import { Card, Form, Button, Input } from 'antd'
type FieldType = {
  username?: string;
  password?: string;
};
export default () => {
  const onFinish = (values: FieldType) => {
    console.log( values, '---values---' );
  }
  return (
    <div className='login-form pt-20'>
      <Card title='Next 全栈管理后台' className='w-4/5 mx-auto'>
      <Form labelCol={{span: 3}} onFinish={ (v) => {
        console.log(v)
      }}>
        <Form.Item<FieldType> label='用户名' name='username'>
          <Input placeholder='请输入用户名'></Input>
        </Form.Item>
        <Form.Item<FieldType> label='密码' name='password'>
          <Input.Password placeholder='请输入密码'></Input.Password>
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>登录</Button>
        </Form.Item>
      </Form>
      </Card>
    </div>
  )
}

```

### 7.2 修改 tailwind 配置文件

如果出现了样式覆盖问题，需要修改 tailwind.config.ts 配置文件。

```javascript
import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // 禁止覆盖 UI 库的样式（antd）
  }
}
export default config
```

### 7.3 Form

​	在使用 antd Form 组件时需要指定，有报错

## 8. 中间件

 在根目录下创建 middleware 文件，中间件每一次代码执行都会先执行中间件逻辑。[middleware 官方文档说明](https://nextjs.org/docs/app/building-your-application/routing/middleware) 。

```ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if( pathname.startsWith( '/admin' ) ){
    // 管理后台
    // 是否登录
    if( !pathname.startsWith('/admin/login') ){
      if(request.cookies.get('admin-token') ){
        // 已经登录
      }else {
        // 跳转到登录页
        return NextResponse.redirect( new URL('/admin/login', request.url ) );
      }
    }
  }
  console.log( '中间件执行了' );
  // return NextResponse.redirect(new URL('/home', request.url))
}
// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/about/:path*',
// }
```

### 8.1 登录接口

​	使用登录接口，向客户端设置头部信息 `cookie` ，客户端通过是否存在 cookie 判断是否登录。

```ts
import { NextRequest, NextResponse } from "next/server"
export const POST = async ( req: NextRequest ) => {
  // const data = await req.json();
  // await prisma.goods.create({
  //   data
  // });
  return NextResponse.json({
    success: true,
    errorMessage: '登录成功',
    data: {},
  }, { // 第二个选项参数
    headers: {
      'Set-cookie': 'admin-token=123;Path=/'
    }
  })
}
```



## 4. 异步加载

​	next.js 异步加载与 react@18.x 基本一致。如下所示：

```tsx
// ./components/AsyncComponent/index.tsx
export default (): Promise<React.ReactNode> => {
  return new Promise( (resolve, reject ) => {
    setTimeout( () => {
      resolve( <div className='async-component'>我是异步组件</div> )
    }, 3000);
  })
}
```

​	异步组件的使用，同样需要使用 react 中的 lazy 和 Suspense。

```tsx
'use client'
import { lazy, Suspense } from 'react'
const AsyncComponent = lazy(() => import('@/components/AsyncComponent'))
export default () => {
  return (
   <section className="settings-page">
     <Suspense fallback={ <div>loading</div> }>
       <AsyncComponent></AsyncComponent>
     </Suspense>
   </section>
  )
}
```



## 5. error 

​	异常报错捕获，在页面路由中配置 error 文件用于捕获异常。可以单独设置也可以在根目录中设置，根目录设置为全局捕获，局部设置的话会覆盖全局设置。

```tsx
// ./error.js
'use client'
import { useEffect } from 'react'
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

​	模拟异常，在组件中直接通过 `throw new Error( '模拟报错' );` 即可。

