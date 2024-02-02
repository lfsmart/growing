# 目录说明

| 序号 | 目录名称           | 功能说明                             | 备注     |
| :--: | ------------------ | ------------------------------------ | -------- |
|  1   | lifecycle          | 生命周期                             |          |
|  2   | window             | 窗口控制                             | 窗口属性 |
|  3   | preventWindowClose | 阻止窗口关闭                         |          |
|  4   | customWindow       | 手动实现窗口关闭、最小化、关闭       |          |
|  5   | menu               | 选项菜单                             |          |
|  6   | contextmenu        | 右键菜单                             |          |
|  7   | communication      | 主进程&渲染进程之间的通信            |          |
|  8   | communication-1    | 渲染进程&渲染进程之间的通信          |          |
|  9   | dialog             | 对话框                               |          |
|  11  | shell & iframe     | 默认浏览器打开外链、在应用内打开外链 |          |



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

​	在 vscode 中内置了 JavaScript Debugger 调试插件，这个插件与之前的 Debugger for Chrome 是一致的。在调试 electron 需要注意主进程和子进程调试的异同。调试配置需要在项目目录中配置 `.vscode/launch.json` 文件。由于不同的语言的配置不同，vscode 官方提供了配置方案，[官方配置](https://github.com/microsoft/vscode-recipes/tree/main/Electron) 直接粘贴到 `.vscode/launch.json` 即可。在渲染进程中可以拉起 chrome 调试工具，`ctrl + shift + I`，或者直接在代码中自动打开调试工具。

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

​	如果在调试的过程中需要打印，使用 console 控制台输出乱码，执行如下命令：

```bash
chcp # 查看当前编码 默认是 936
chcp 65001 # 对应编码为 utf-8
```

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

## 6.7 阻止窗口关闭

​	通过 html 实现 modal 弹窗布局，监听窗口卸载事件 `onbeforeunload` 阻止窗口关闭，并弹出自定义模态框，通过自定义模态框销毁 window 窗口。

```javascript
// 渲染进程
const { remote } = require( 'electron' );
window.addEventListener( 'DOMContentLoaded', () => {
  const closeDom = document.querySelector('#close');
  const modalDom = document.querySelector( '#modal-box' );
  const confirmDom = document.querySelector( '#confirm' );
  const cancelDom = document.querySelector( '#cancel' );
  const mainWin = remote.getCurrentWindow();
  window.onbeforeunload = function(){
    modalDom.classList.add('show');
    return false;
  }
  closeDom.addEventListener('click', () => {
    mainWin.close();
  }, false );
  cancelDom.addEventListener( 'click', () => {
    modalDom.classList.remove('show');
  }, false );
  confirmDom.addEventListener( 'click', () => {
    mainWin.destroy()
  }, false )
})
```



# 7. 菜单控制

​	通过 electron 中的 Menu 模块操作菜单选项。[官方文档说明](https://www.electronjs.org/zh/docs/latest/api/menu#%E4%B8%BB%E8%8F%9C%E5%8D%95%E7%9A%84%E5%90%8D%E7%A7%B0)，[menu-item](https://www.electronjs.org/zh/docs/latest/api/menu-item ) 。

> 第一步：创建菜单选项模版，`Menu.buildFromTemplate` 。
>
> 第二步：设置菜单选项，将菜单模版添加到应用。`Menu.setApplicationMenu` 。

```javascript
const { Menu } = require( 'electron' );
// 生成需要的菜单项
const menu = Menu.buildFromTemplate([
  { 
    label: '文件',
    submenu: [
      { label: '关闭文件夹', click:() => console.log('事件') },
      { role: 'undo', label: '撤销'},
      { type: 'separator' },
      { label: '关于', role: 'about' },
      { type: 'separator' },
      { type: 'checkbox', label: 'checkbox1' },
      { type: 'radio', label: 'rdo1' },
    ] 
  },
  { label: '编辑' }
]);
// 将自定义菜单添加代应用里
Menu.setApplicationMenu( menu );
```

​	自定义菜单会导致，无法打开开发开发者工具，需要手动开启调试工具。如下所示：

```javascript
const mainWin = new BrowserWindow({
    width: 800,
    height: 600
}); 
mainWin.webContents.openDevTools();
```

### 7.1 role 选项

​	role 选项默认是系统选项，选项参数有：undo、redo、cut、copy、paste、pasteAndMatchStyle、delete、selectAll、reload、forceReload、toggleDevTools、resetZoom、zoomIn、zoomOut、togglefullscreen、window、minimize、close、help、about、services、hide、hideOthers、unhide、quit、startSpeaking、stopSpeaking、zoom、front、appMenu、fileMenu、editMenu、viewMenu、recentDocuments、toggleTabBar、selectNextTab、selectPreviousTab、mergeAllWindows、clearRecentDocuments、moveTabToNewWindow、windowMenu 41个选项参数

```javascript
const menus = Menu.buildFromTemplate([
  { 
    label: 'role',
    submenu: [
      { label: '复制', role: 'copy' },
      { label: '剪切', role: 'cut' },
      { label: '粘贴', role: 'paste' },
      { label: '最小化', role: 'minimize' },
    ] 
  }
]);
Menu.setApplicationMenu( menus );
```

### 7.2 type 选项

​	type 包含，checkbox、radio、separator、submenu、normal 5个选项值。

```javascript
const menus = Menu.buildFromTemplate([
  { 
    label: 'type',
    sublabel: '类型',
    submenu: [
      { label: '选项1', type: 'checkbox' },
      { type: 'separator' },
      { label: '单向选项1', type: 'radio' },
      { type: 'separator' },
      { label: 'windows', type: 'submenu', role: 'windowMenu' }
    ]
  }
]);
Menu.setApplicationMenu( menus );
```

### 7.3 其他选项

​	包含 icon、accelerator（快捷键）、click 等 选项参数。

```javascript
// 生成需要的菜单项
const menus = Menu.buildFromTemplate([  
  {
    label: '其他',
    submenu: [
      { 
        label: '打开', 
        icon: path.join( __dirname, 'file-open.png' ), 
        accelerator: 'ctrl + o',
        click: () => {
          console.log( '打开' );
        }
      }
    ]
  }
]);
Menu.setApplicationMenu( menus );
```

### 7.4 动态创建菜单

​	在渲染进程中通过操作渲染进程中的按钮，动态创建菜单和菜单选项等。Menu 用于创建菜单，MenuItem 创建子菜单，通过 append 方法添加子菜单。

```javascript
const { remote } = require( 'electron' );
const Menu = remote.Menu;
const MenuItem = remote.MenuItem;

// 渲染进程
window.addEventListener( 'DOMContentLoaded', () => {
  const inputDom = document.querySelector( '#input' );
  const addMenuDom = document.querySelector( '#addMenu' );
  const addItemDom = document.querySelector( '#addItem' );
  const submenus = new Menu(); // 预留菜单

  addMenuDom.addEventListener( 'click', () => {
    // 创建菜单
    const menuItemFile = new MenuItem({ label: '文件', type: 'normal' });
    const menuItemEdit = new MenuItem({ label: '编辑', type: 'normal' });
    const customMenu = new MenuItem({ label: '自定义菜单项', submenu: submenus })
    const menus = new Menu();
    menus.append( menuItemFile );
    menus.append( menuItemEdit );
    menus.append( customMenu );
    Menu.setApplicationMenu( menus );
  });
  // 添加子菜单
  addItemDom.addEventListener( 'click', () => {
    const val = inputDom.value.trim();
    if( val ){
      submenus.append(
        new MenuItem({
          label: val,
          type: 'normal'
        })
      )
      menuConDom.value = ''
    }
  });
})
```

# 8. 右键设置

​	右键菜单，通过 Menu 模块设置菜单选项，这一点与菜单选项实现基本一致，右键使用 menu.popup 设置菜单。

```javascript
const { remote } = require( 'electron' );
const Menu = remote.Menu;
window.addEventListener( 'DOMContentLoaded', () => {
  // 定义菜单内容
  const menus = Menu.buildFromTemplate([
    { label: 'Run Code' },
    { label: '转到定义' },
    { type: 'separator' },
    { 
      label: '其他功能',
      click: () => {
        console.log( '其它功能选项被点击了' );
      }
    },
  ]);
  // 创建菜单
  window.addEventListener( 'contextmenu', (ev) => {
    ev.preventDefault();
    menus.popup({
      window: remote.getCurrentWindow()
    })
  }, false )
})
```



# 9. 进程通信

## 9.1 主进程&渲染进程

​	通过在主进程中订阅事件，在渲染进程中通过主进程的订阅事件向主进程发送数据，主进程和渲染进程通过事件订阅的方式实现相互通信。9.1 和 9.2 均是由渲染进程主动触发异步通信事件，主进程接受渲染进程数据。

### 9.1.1 渲染进程主动触发（异步）

**渲染进程**，通过 `ipcRenderer.send` 方法，向主进程事件 `sync-message` 发送消息。

```javascript
const { ipcRenderer } = require( 'electron' );
syncDom.addEventListener( 'click', () => {
  ipcRenderer.send( 'sync-message', '我是渲染进程的一条异步消息' );
});
// 接受主进程数据
ipcRenderer.on( 'async-fallback-message', (ev, data ) => {
  console.log({ ev, data });
})
```

**主进程**，通过 `ipcMain.on` 订阅 `async-message` 事件，

```javascript
ipcMain.on( 'async-message', ( ev, data ) => {
  console.log( data );
  // 向渲染进程发送异步数据
  ev.sender.send( 'async-fallback-message', '我是主进程反馈的消息' )
});
```

### 9.1.2 渲染进程主动触发（同步）

**渲染进程**，通过 `ipcRenderer.sendSync` 向主进程发送同步消息，返回值主进程反馈的同步数据，即主进程通过主进程事件对象 `ev.returnValue` 的值。

```javascript
syncDom.addEventListener( 'click', () => {
  const val = ipcRenderer.sendSync( 'sync-message', '我是渲染进程的一条【同步消息】' );
  console.log( val ); // 主进程 ev.returnValue 的数据
});
```

**主进程**，通过 `ipcMain.on` 订阅同步事件消息，并通过事件对象 `ev.returnValue` 反馈主进程消息。

```javascript
ipcMain.on( 'sync-message', ( ev, data ) => {
  console.log( data );
  ev.returnValue = '我是主进程反馈的消息【同步消息】'
});
```

### 9.1.3 主进程主动触发

**主进程，**通过 `BrowserWindow.getFocusedWindow().webContents.send` 向渲染进程发送订阅消息。如下所示：

```javascript
BrowserWindow.getFocusedWindow().webContents.send( 'main-send-message', '主进程主动触发消息' );
```

**渲染进程，**通过 `ipcRenderer.on` 监听订阅事件，通过订阅事件接受订阅消息。

```javascript
ipcRenderer.on( 'main-send-message', ( ev, data ) => {
  console.log( ev, data );
})
```

## 9.2 渲染进程 & 渲染进程

### 9.2.1 localStorage

1. 在渲染进程中，向主进程发送数据，通知主进程打开新窗口，并通过 localStorage 存储数据。

```javascript
// renderer.js index.html
const openDom = document.querySelector( '#open' );
openDom.addEventListener( 'click', () => {
  ipcRenderer.send( 'open-new-window');
  localStorage.setItem('name', `electron lantian ${ Math.random() }`);
});
```

2. 在主进程中订阅创建新窗口，并通过 `BrowserWindow.fromId` 设置父窗口。

```javascript
// main.js
ipcMain.on( 'open-new-window', (ev, data) => {
  let subWin = new BrowserWindow({
    parent: BrowserWindow.fromId( mainWinId ),
    width: 400,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  });
  subWin.loadFile( path.join( __dirname, 'sub.html' ) );
  subWin.on( 'close', () => {
    subWin = null
  });
});
```

3. 在新建窗口中，通过 localStorage 获取数据，实现数据在不同的渲染进程中的通信。

```javascript
// sub.js sub.html 在子窗口中获取存储的数据
const inputDom = document.querySelector( '#input' );
const val = localStorage.getItem( 'name' );
inputDom.value = val;
```

### 9.2.2 通过主进程

​	两个渲染进程之间的通信，通过主进程中转。如 sub.js 发送数据给 renderer.js 实现方式如下:

```javascript
// sub.js sub.html 点击 sendDom 向 renderer.js 发送数据
sendDom.addEventListener( 'click', () => {
  ipcRenderer.send( 'sub-send-renderer', '来自 sub 进程的信息数据' );
});
```

​	在主进程 main.js 中中转来自 sub.js 发送的消息，在主进程中需要通过 `BrowserWindow.fromId` 获取需要接收数据的窗口。

```javascript
// main.js
ipcMain.on( 'sub-send-renderer', (ev, data ) => {
  // 通过 main 进程将 data 数据转交给指定的渲染进程
  // 依据指定的窗口 ID 获取对应的渲染进程，然后发送消息
  const mainWin = BrowserWindow.fromId( mainWinId );
  mainWin.webContents.send( 'sub-send-renderer', { from: 'sub-send-renderer', data });
});
```

​	在渲染进程中，需要订阅来自主进程事件，接收主进程发送过来的数据。

```javascript
// renderer.js index.html
ipcRenderer.on( 'sub-send-renderer', ( ev, data ) => {
  console.log( data, '我是 renderer, 我收到了来自 sub 渲染进程的数据了' );
});
```

# 10. dialog

​	内置对话框，[官方文档](https://www.electronjs.org/zh/docs/latest/api/dialog) ，基本用法如下所示：

```javascript
// dialog.showOpenDialog
remote.dialog.showOpenDialog({
  defaultPath: __dirname, // 当前路径
  buttonLabel: '请选择',
  title: 'electron',
  properties: [
    // 'openFile',
    // 'openDirectory',
    'multiSelections',
  ],
  filters: [
    { "name": "代码文件", extensions: [ 'js', 'json', 'html' ] },
    { "name": "图片文件", extensions: [ 'ico', 'jpeg', 'png' ] },
    { "name": "媒体类型", extensions: [ 'avi', 'mp4', 'mp3' ] },
  ]
}).then( res => {
  console.log(res);
});
// dialog.showErrorBox
remote.dialog.showErrorBox( '自定义标题', '当前错误内容' );
```

# 11. shell & iframe

## 11.1 shell

​	shell 模块式主进程和渲染进程都可以使用的模块，高版本（> 14.x）只存在于主进程，使用默认应用程序管理文件和 url。iframe 与 webview 类似，官方建议使用 iframe。

​	通过 shell 模块的 `shell.openExternal` 方法实现打开外链，如下所示: 

```javascript
const { remote, shell, ipcRenderer } = require( 'electron' );
shell.openExternal( 'https://www.electronjs.org/zh/docs/latest/api/shell' ); // 在默认浏览器中打开外链
```

​	通过 shell 模块中的 `shell.showItemInFolder` 方法打开文件夹，如下所示：

```javascript
const { remote, shell, ipcRenderer } = require( 'electron' );
const path = require( 'path' );
shell.showItemInFolder( path.resolve( __dirname ) ); // 打开目录
```

## 11.2 iframe

​	使用 iframe 在应用内部打开外链，通过操作 iframe 的 src 属性实现不同的外链之间的切换。主进程通过 `BrowserWindow.getFocusedWindow().webContents.send` 向渲染进程发送消息。

```javascript
const { BrowserWindow, shell, Menu } = require( 'electron' );
const menus = Menu.buildFromTemplate([
  { 
    label: '菜单',
    submenu: [
      {
        label: '关于',
        click(){
          shell.openExternal( 'https://www.electronjs.org/zh/docs/latest/api/shell' ); // 使用默认浏览器打开外链
        }
      }, 
      {
        label: '打开',
        click(){
          // 主进程发布消息通知订阅者（渲染进程）通过订阅事件 openUrl
          BrowserWindow.getFocusedWindow().webContents.send( 'openUrl' );
        }
      }
    ]
  }
]);
Menu.setApplicationMenu( menus );
```

​	在渲染进程中操作 iframe 在应用内部打开外部链接，如下所示：

```javascript
const { remote, shell, ipcRenderer } = require( 'electron' );
const iframeDom = document.querySelector( '#webview' ); // 获取 iframe 元素
// 渲染进程，订阅主进程 openUrl 事件，在应用内打开外链
ipcRenderer.on( 'openUrl', (e, data) => {
  iframeDom.src = 'https://react.docschina.org/';
})
```

​	在 iframe 全屏展示样式处理，样式如下所示：

```css
iframe{ 
  position: fixed; 
  top: 0; 
  left: 0; 
  width: 100%; 
  height: 100%; 
}
```

# 12. 消息通知

​	消息通知，使用的是 html5 的 api, [官方文档](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API)。

```javascript
// 在渲染进程中
dispatchDom.addEventListener( 'click', () => {
  const notification = new window.Notification('title-electron',{
    body: '学习 electron 相关 API ',
    icon: './apple-touch-icon.png',
  });
  // 显示
  notification.addEventListener( 'show', () => {
    console.log( 'show' );
  });
  // 点击卡片
  notification.addEventListener( 'click', () => {
    console.log( 'click' );
  });
  // 关闭通知消息
  notification.addEventListener( 'close', () => {
    console.log( 'close' );
  });
  // 卡片消息报错
  notification.addEventListener( 'error', () => {
    console.log( 'error' );
  });
})
```

# 13.全局快捷键

​	注册快捷键和删除快捷键的操作，在主进程中注册和删除应用快捷键。electron 中提供了 globalShortcut 模块用于实现快捷键的注册和删除。

**注册快捷键**：`globalShortcut.register` ，在应用 ready 事件之后注册快捷键。

**删除注册快捷键**：`globalShortcut.unregister` ，需要在应用退出之前删除注快捷键。`globalShortcut.unregisterAll` ，删除所有的快捷键。

**检测是否注册过快捷键**：`globalShortcut.isRegistered` 

```javascript
const { app, globalShortcut } = require( 'electron' );
app.on( 'ready', () => {
  // 返回注册是否成功，成功则返回 true，否则返回 false
  const ctrlq = globalShortcut.register( 'ctrl + q', () => {
    // 在这里执行快捷键的命令
    console.log( '快捷键注册成功' );
  });
  if( !ctrlq ){
    console.log( '注册失败' );
  }
  console.log( ctrlq, globalShortcut.isRegistered( 'ctrl + q' ) );
});
// 应用退出删除快捷键
app.on( 'will-quit', () => {
  globalShortcut.unregister( 'ctrl + q' );
  globalShortcut.unregisterAll();
});
```

