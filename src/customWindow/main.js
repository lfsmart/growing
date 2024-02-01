const { app, BrowserWindow } = require( 'electron' );
const path = require( 'path' );

// 创建窗口
function createWindow(){
  let mainWin = new BrowserWindow({
    // 尺寸控制
    width: 800,
    height: 500,
    show: false,
    // title
    title: '自定义窗口',
    icon: path.join( __dirname, 'apple-touch-icon.png' ),
    frame: false, // 用于自定义菜单，将默认的标题栏和选项卡栏隐藏
    webPreferences: {
      nodeIntegration: true, // 启用 node 环境
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

// 默认退出应用程序
app.on('window-all-closed', () => {
  console.log( '-> window-all-closed' );
  app.quit();
});


