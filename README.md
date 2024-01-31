# 1. 安装

```bash
npm i -D electron@11.x
```

​	在安装时需要配置镜像，只要是下载安装失败，失败的原因基本都是镜像问题，需要在项目目录下创建 `.npmrc` 文件配置如下内容：

```bash
ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
```

# 2. 启动

​	下载安装 nodemon 监听 js 文件变动，刷新自动创建启动应用程序。

```bash
npm i -g nodemon
```

​	在 package.json 中配置应用主进程入口文件 main.js 和 开发环境的配置。

```json
"main": 'main.js', 
"scripts": {
  "dev": "nodemon --watch src/**/*.js --exec electron .",
},   
```

