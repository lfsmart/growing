const { app, BrowserWindow, ipcMain, Menu } = require( 'electron' );
const path = require( 'path' );
// 创建全局变量 id
let mainWinId = null;
// 创建窗口
function createWindow(){
  let mainWin = new BrowserWindow({
    // 尺寸控制
    width: 800,
    height: 500,
    show: false,
    title: '渲染进程与渲染进程通信',
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
  mainWinId = mainWin.id;
  // close
  mainWin.on('close', () => {
    mainWin = null
  })
}

app.on( 'ready', createWindow );

// 默认退出应用程序
app.on('window-all-closed', () => {
  app.quit();
});

ipcMain.on( 'open-new-window', (ev, data) => {
  // 打开一个窗口
  let subWin = new BrowserWindow({
    parent: BrowserWindow.fromId( mainWinId ),
    width: 400,
    height: 400,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  });
  subWin.loadFile( path.join( __dirname, 'sub.html' ) );
  subWin.on( 'ready-to-show', () => {
    subWin?.show()
  });
  subWin.on( 'close', () => {
    subWin = null
  });

  // 在窗口内容加载完成后执行
  subWin.webContents.on( 'did-finish-load', () => {
    subWin.webContents.send( 'main-send-sub', {
      from: 'renderer',
      data
    })
  });

});

ipcMain.on( 'sub-send-renderer', (ev, data ) => {
  // 通过 main 进程将 data 数据转交给指定的渲染进程
  // 依据指定的窗口 ID 获取对应的渲染进程，然后发送消息
  const mainWin = BrowserWindow.fromId( mainWinId );
  mainWin.webContents.send( 'sub-send-renderer', { from: 'sub-send-renderer', data });
});


