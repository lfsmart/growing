const { app, BrowserWindow, globalShortcut } = require( 'electron' );
const path = require( 'path' );

// 创建窗口
function createWindow(){
  let mainWin = new BrowserWindow({
    width: 800,
    height: 500,
    show: false,
    title: 'notification',
    icon: path.join( __dirname, 'apple-touch-icon.png' ),
    webPreferences: {
      nodeIntegration: true, // 允许 node 环境
      contextIsolation: false,
      enableRemoteModule: true, // 启用远程模块
    }
  });
  mainWin.loadFile( path.join( __dirname, 'index.html' ) );
  mainWin.on( 'ready-to-show', () => {
    mainWin?.show();
  })
  // close
  mainWin.on('close', () => {
    mainWin = null
  })
}


app.on( 'ready', createWindow );
app.on( 'ready', () => {

  const ctrlq = globalShortcut.register( 'ctrl + q', () => {
    console.log( '快捷键注册成功' );
  });
  if( !ctrlq ){
    console.log( '注册失败' );
  }

  console.log( ctrlq, globalShortcut.isRegistered( 'ctrl + q' ) );
  
});
app.on( 'will-quit', () => {
  globalShortcut.unregister( 'ctrl + q' );
  globalShortcut.unregisterAll(); // 删除全部的快捷键
});

// 默认退出应用程序
app.on('window-all-closed', () => {
  console.log( '-> window-all-closed' );
  app.quit();
});


