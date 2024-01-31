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

# 3. 调试

​	在 vscode 中内置了 JavaScript Debugger 调试插件，这个插件与之前的 Debugger for Chrome 是一致的。在调试 electron 需要注意主进程和子进程调试的异同。调试配置需要在项目目录中配置 `.vscode/launch.json` 文件。由于不同的语言的配置不同，vscode 官方提供了配置方案，[官方配置](https://github.com/microsoft/vscode-recipes/tree/main/Electron) 直接粘贴到 `.vscode/launch.json` 即可。

```json
{
  "version": "0.2.0",
  "configurations": [{
    "type": "node",
    "request": "launch",
    "name": "Electron: Main",
    "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron",
    "runtimeArgs": [
      "--remote-debugging-port=9223",
      "."
    ],
    "windows": {
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron.cmd"
    }
  }, {
    "name": "Electron: Renderer",
    "type": "chrome",
    "request": "attach",
    "port": 9223,
    "webRoot": "${workspaceFolder}",
    "timeout": 30000
  }],
  "compounds": [{
    "name": "Electron: All",
    "configurations": [ "Electron: Main", "Electron: Renderer" ]
  }]
}
```

​	配置完成后，在 vscode 状态栏会看到 electron 调试按钮。点击调试按钮，默认情况下请选择 `Electron:All` 这个选项，每次断点调试均在这个状态下调试，因为子进程调试，必须先启动主进程，单个进程调试，调试会发生异常。可以通过调试工具中的刷新按钮，从新执行断点。

![image-20240127125723391](https://raw.githubusercontent.com/lfsmart/images/master/img/image-20240127125723391.png?token=AEUNKV75WLSMCO3FRRCSKRTFXD7JI)

![image-20240127125757582](https://raw.githubusercontent.com/lfsmart/images/master/img/image-20240127125757582.png?token=AEUNKVY6DY3NF2FJF75JVSLFXD7JU)

# 4. Electron 工作流程

![image-20240127205007782](https://raw.githubusercontent.com/lfsmart/images/master/img/image-20240127205007782.png?token=AEUNKVZD276BXKRU2EZUPX3FXD7KC)

![image-20240127205411822](https://raw.githubusercontent.com/lfsmart/images/master/img/image-20240127205411822.png?token=AEUNKV6Y2NK2VTUI4ZE5GA3FXD7KQ)

## 4.1 主进程

- 可以看做是 package.json 中 main 属性对应的文件
- 一个应用只会有一个主进程
- 只有主进程可以进行 GUI 的 API 操作， 如果渲染进程需要调用原生 API 则需要经过与主进程的通信完成调用。

## 4.2 渲染进程

- windows 中展示的界面通过渲染进程表现
- 一个应用可以有多个渲染进程



# 5. 生命周期

- ready：app 初始化完成，应用启动触发，app 事件。
- dom-ready：一个窗口中的文本加载完成, 是有 webContents 进行调用，窗口事件。
- did-finish-load：导航完成后触发，发生在 dom-ready 之后，是有 webContents 进行调用，窗口事件。
- window-all-closed：所有的窗口都被关闭时触发，监听此事件需要手动退出程序，默认不会自动退出程序， app事件。
- before-quit：在窗口关闭前触发。
- will-quit：在窗口关闭并且应用程序退出时触发。
- quit：当所有窗口被关闭时触发。
- closed：当窗口关闭时触发，此时应删除窗口引用，可能存在多窗口。

## 5.1 生命周期执行

```typescript
import { app, BrowserWindow, ipcMain } from "electron";
function createWindow(){
  let mainWin: OrNull<BrowserWindow> = new BrowserWindow({
    width: 800,
    height: 400
  });
  mainWin.loadFile('index.html');
  // dom-ready
  mainWin.webContents.on('dom-ready', () => {
    console.log( '2 -> dom-ready' );
  });
  // did-finish-load
  mainWin.webContents.on('did-finish-load', () => {
    console.log( '3 -> did-finish-load' );
  });
  // close
  mainWin.on('close', () => {
    console.log( '8 -> closed' );
    mainWin = null
  })
}
app.on( 'ready', () => {
  console.log('1 -> ready');
  createWindow()
});
// 默认退出应用程序
app.on('window-all-closed', () => {
  console.log( '4 -> window-all-closed' );
  app.quit();
});
app.on( 'before-quit', () => {
  console.log( '5 -> before-quit' )
})
app.on( 'will-quit', () => {
  console.log( '6 -> before-quit' )
})
app.on( 'quit', () => {
  console.log( '7 -> quit' );
})
```

执行结果如下：

```
1 -> ready
2 -> dom-ready
3 -> did-finish-load
8 -> closed
4 -> window-all-closed
5 -> before-quit
6 -> before-quit
7 -> quit
```

​	closed 当窗口关闭时触发，因为可能存在多个应用窗口，所以在周期放在最后了，这也是窗口的钩子函数。事件 `window-all-closed` 是 app 的监听函数，默认不退出应用程序，需要手动退出应用程序。程序退出，触发应用的钩子函数。



