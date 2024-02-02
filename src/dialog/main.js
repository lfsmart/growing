const { app, BrowserWindow, dialog, ipcMain, Menu } = require( 'electron' );
const path = require( 'path' );

// 创建窗口
function createWindow(){
  let mainWin = new BrowserWindow({
    width: 800,
    height: 500,
    show: false,
    title: 'dialog 模块',
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

app.on( 'ready', createWindow );

// 默认退出应用程序
app.on('window-all-closed', () => {
  app.quit();
});




