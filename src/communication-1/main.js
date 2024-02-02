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
});


