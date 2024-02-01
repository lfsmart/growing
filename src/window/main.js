const { app, BrowserWindow } = require( 'electron' );
const path = require( 'path' );

// 创建窗口
function createWindow(){
  let mainWin = new BrowserWindow({
    // 尺寸控制
    width: 800,
    height: 500,
    // x: 100,
    // y: 100,
    show: false,
    maxHeight: 600,
    maxWidth: 900,
    minHeight: 300,
    minWidth: 300,
    resizable: false,
    // title
    title: '窗口控制-title',
    icon: path.join( __dirname, 'apple-touch-icon.png' ),
    frame: true, // 用于自定义菜单，将默认的标题栏和选项卡栏隐藏
    movable: true,
    transparent: true, // 只有在 frame=false 才生效
    autoHideMenuBar: true, // 
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

// 默认退出应用程序
app.on('window-all-closed', () => {
  console.log( '-> window-all-closed' );
  app.quit();
});


