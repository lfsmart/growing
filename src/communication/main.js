const { app, BrowserWindow, ipcMain, Menu } = require( 'electron' );
const path = require( 'path' );

// 创建窗口
function createWindow(){
  let mainWin = new BrowserWindow({
    // 尺寸控制
    width: 800,
    height: 500,
    show: false,
    title: '主进程与渲染进程通信',
    icon: path.join( __dirname, 'apple-touch-icon.png' ),
    webPreferences: {
      nodeIntegration: true, // 允许 node 环境
      contextIsolation: false,
      enableRemoteModule: true, // 启用远程模块
    }
  });
  mainWin.loadFile( path.join( __dirname, 'index.html' ) );
  mainWin.webContents.openDevTools(); // 打开调试工具
  mainWin.on( 'ready-to-show', () => {
    mainWin?.show();
  })
  // close
  mainWin.on('close', () => {
    mainWin = null
  })
}

// 主进程向渲染进程主动发送数据
const menus = Menu.buildFromTemplate([
  { 
    label: 'send',
    click: () => {
      BrowserWindow.getFocusedWindow().webContents.send( 'main-send-message', '主进程主动触发消息' );
    }
  }
])

Menu.setApplicationMenu( menus );

app.on( 'ready', createWindow );

// 默认退出应用程序
app.on('window-all-closed', () => {
  console.log( '-> window-all-closed' );
  app.quit();
});

// 主进程接受渲染进程数据
ipcMain.on( 'async-message', ( ev, data ) => {
  console.log( data );
  ev.sender.send( 'async-fallback-message', '我是主进程反馈的消息' )
});

ipcMain.on( 'sync-message', ( ev, data ) => {
  console.log( data );
  ev.returnValue = '我是主进程反馈的消息【同步消息】'
});



