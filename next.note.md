# nextjs

## 1. 安装

```bash
npx create-next-app@14.0.4 # 使用的是最新的版本
```

![image-20240117151309991](C:/Users/user/AppData/Roaming/Typora/typora-user-images/image-20240117151309991.png)

## 2. 目录结构

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
- page 是视图页面，文件系统中的路由页面必须有 page 文件，page 即为视图渲染的位置也可以理解为 Outlet 占位符渲染的位置。如果 template 文件存在，page 会被渲染到 template
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



