# 学习笔记

​	课程主要使用 react 18 和和 vite 构建工具构建项目。

## 1. 安装

​	执行如下命令，按照提示选择即可。

```bash
npm init vite@5.0.8
```

​	在配置文件中使用了别名配置，在 `vite.config.ts` 中配置如下：

```tsx
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'node:path';
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

​	由于在 ts 中使用了 node 模块 path，因此需要安装 node 类型约束声明系统，按照 ts 类型发布的规则，通常报名为 `@types/<pkgname>` 安装如下：

```bash
npm i -D @types/node 
```

![image-20240104230808370](C:/Users/user/AppData/Roaming/Typora/typora-user-images/image-20240104230808370.png)
