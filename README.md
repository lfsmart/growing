# 1. 安装

```bash
npm i -D electron@11.x #安装 11.x 版本
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
  "dev": "nodemon --delay 500 --watch src/**/*.js --exec electron .",
},   
```

# 3. 调试

​	在 vscode 中内置了 JavaScript Debugger 调试插件，这个插件与之前的 Debugger for Chrome 是一致的。在调试 electron 需要注意主进程和子进程调试的异同。调试配置需要在项目目录中配置 `.vscode/launch.json` 文件。由于不同的语言的配置不同，vscode 官方提供了配置方案，[官方配置](https://github.com/microsoft/vscode-recipes/tree/main/Electron) 直接粘贴到 `.vscode/launch.json` 即可。在渲染进程中可以拉起 chrome 调试工具，`ctrl + shift + I`

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

# 6. 窗口控制

```typescript
import { app, BrowserWindow } from "electron";
let mainWin: OrNull<BrowserWindow> = new BrowserWindow({
  width: 800,
  height: 500,
  x: 100,
  y: 100
});
```

## 6.1 尺寸设置

| 属性                | 属性值           | 备注                  |
| ------------------- | ---------------- | --------------------- |
| width: number       | 宽度             |                       |
| height: number      | 高度             |                       |
| x?: number          | 距离左上角横坐标 |                       |
| y?: number          | 距离左上角纵坐标 |                       |
| maxWidth?: number   | 最大宽度         |                       |
| maxHeight?: number  | 最大高度         |                       |
| minWidth?: number   | 最小宽度         |                       |
| minHeight?: number  | 最小高度         |                       |
| resizable?: boolean | 缩放             | 默认为 true，可以缩放 |

## 6.2 显隐

​	由于窗口创建后默认直接展示，loadFile 文件加载延后，会出现闪屏问题。解决这一问题，可以通过 show=false 手动控制，在 ready-to-show 事件后展示窗口。

```typescript
import { app, BrowserWindow } from "electron";
let mainWin: OrNull<BrowserWindow> = new BrowserWindow({
  width: 800,
  height: 500,
  show: false, // 启东时不展示 window
});
mainWin.loadFile( 'index.html' );
// webContents 已经准备好了，可以展示了
mainWin.on( 'ready-to-show', () => { 
  mainWin?.show();
})
```

## 6.3 标题

| 属性           | 属性值     | 备注                              |
| -------------- | ---------- | --------------------------------- |
| title?: string | 应用的标题 | html 中设置了 title，会忽略该属性 |
| icon?: string  | 图标       |                                   |

## 6.4 其他

| 属性                                         | 属性值                     | 备注                                                   |
| -------------------------------------------- | -------------------------- | ------------------------------------------------------ |
| frame?: boolean                              | 是否展示图标、标题、选项卡 | 默认为 true, 为 false 后不能拖拽移动                   |
| movable?: boolean                            | 是否可移动                 | 默认可移动，按住应用标题栏                             |
| transparent?: boolean                        | 是否透明                   | 默认 true，不透明，只有在 frame=false 有效             |
| modal?: boolean                              | 是否开启模态框             | 需要配合 parent 使用，否则不生效                       |
| autoHideMenuBar?: boolean                    | 是否隐藏选项卡             | 默认 false，展示。                                     |
| webPreferences?.nodeIntegration?: boolean    | 允许使用 node 集成环境     | 默认 false，渲染进程模块需要开启                       |
| webPreferences?.contextIsolation?: boolean   | 是否开启上下文隔离         | 默认关闭，关闭上下文隔离，主要是为了防止外部的脚本冲突 |
| webPreferences?.enableRemoteModule?: boolean | 是否启用远程模块           | 在渲染进程中可以使用 remote 模块调用主进程模块方法     |

## 6.5 打开新窗口

​	由于，electron 渲染进程开发中直接使用 script 引入，模块引入报错，ts 打包 仅能使用一种打包方式，为了避免报错，应用改成 js 的方式。

​	打开新窗口的实现方式，如下所示：

```javascript
// 主进程
function createWindow(){
  let mainWin = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true, // 允许使用 node 集成环境
      contextIsolation: false, // 关闭上下文隔离，主要是为了防止外部的脚本与 preload 脚本冲突
    }
  });
  mainWin.loadFile( 'index.html' );
  mainWin.on( 'ready-to-show', () => {
    mainWin?.show();
  })
  // close
  mainWin.on('close', () => {
    mainWin = null
  })
}
```

​	渲染进程是不允许使用主进程的方法和属性，需要在主进程中授权。授权之后，在渲染进程中通过 remote 模块调用主进程方法。

```javascript
// 主进程
let mainWin = new BrowserWindow({
 webPreferences: {
   	nodeIntegration: true, // 允许使用 node 集成环境
   	contextIsolation: false, // 不使用隔离，主要是为了防止外部的脚本与 preload 脚本冲突
   	enableRemoteModule: true, // 启用远程模块，在渲染进程中可以使用 remote 模块调用主进程模块方法
  }
});
```

​	渲染进程通过 remote 模块，调用主进程方法。在新窗口中，指定新窗口为子窗口，并指定子窗口为模态窗口。通过 `remote.getCurrentWindow()` 获取当前窗口实例。14.x 高版本不在使用这种方式，而是将 remote 作为第三方模块 @electron/remote 使用。

```javascript
const { remote } = require( 'electron' );
// 渲染进程
window.addEventListener( 'DOMContentLoaded', () => {
  const btnDom = document.querySelector('#open');
  btnDom.addEventListener( 'click', () => {
    let subWin = new remote.BrowserWindow({ // 与主进程的方式
      parent: remote.getCurrentWindow(), // 指定父窗口
      width: 200,
      height: 200,
      modal: true, // 当前窗口为模态框
    });
    subWin.loadFile( 'sub.html' );
    subWin.on( 'close', () => {
      subWin = null;
    });
  }, false )
})
```

## 6.6 自定义窗口

​	实现窗口最大化、最小化、窗口恢复、关闭等自定义操作。在模版页面布局完成后，通过监听 DOM 事件操作主窗口。

```javascript
// 渲染进程
const { remote } = require( 'electron' );
window.addEventListener( 'DOMContentLoaded', () => {
  const zoominDom = document.querySelector('#zoomin');
  const zoomoutDom = document.querySelector('#zoomout');
  const closeDom = document.querySelector('#close');
  const mainWin = remote.getCurrentWindow();
  // 最小化
  zoominDom.addEventListener( 'click', () => {
    !mainWin.isMinimized() && mainWin.minimize()
  }, false );
  // 最大化
  zoomoutDom.addEventListener( 'click', () => {
    if( !mainWin.isMaximized() ){
      mainWin.maximize(); // 最大化
    }else {
      mainWin.restore(); // 恢复
    }
  }, false );
  // 关闭
  closeDom.addEventListener( 'click', () => {
    mainWin.close();
  }, false );
})
```



