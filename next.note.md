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

​	按照官网的说明，路由配置约定为 `page/layout/template` 这三种方式，`page` 表示路由页面，`template` 是模版与 `layout` 使用基本一致，但是在根目录中必须使用 `layout` 文件作为布局组件，如果 `template` 和 `layout` 两个文件都存在，页面都会渲染，且根目录的布局组件必须存在，根目录的子页面布局文件可以不存在，只要有 `page` 文件即可。page 即为视图渲染的位置也可以理解为 Outlet 占位符渲染的位置。因此如果需要继承的话，需要做在 layout 布局文件中定义需要继承的 UI。

​	在 next@12.x 版本之前，使用的是 page router 页面路由约定在 pages 文件目录下，如果 App router 与 page router 同时存在则优先渲染 App router 下面的路由。

### 3.2 链接和导航

 	link 跳转链接，
