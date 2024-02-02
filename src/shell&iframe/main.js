const { app, BrowserWindow, shell, Menu } = require( 'electron' );
const path = require( 'path' );

// 创建窗口
function createWindow(){
  let mainWin = new BrowserWindow({
    width: 800,
    height: 500,
    show: false,
    title: 'shell & iframe',
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

const menus = Menu.buildFromTemplate([
  { 
    label: '菜单',
    submenu: [
      {
        label: '关于',
        click(){
          shell.openExternal( 'https://www.electronjs.org/zh/docs/latest/api/shell' );
        }
      }, 
      { // 在窗体内部打开
        label: '打开',
        click(){
          // 通知
          BrowserWindow.getFocusedWindow().webContents.send( 'openUrl' );
        }
      }
    ]
  }
]);

Menu.setApplicationMenu( menus );

app.on( 'ready', createWindow );

// 默认退出应用程序
app.on('window-all-closed', () => {
  console.log( '-> window-all-closed' );
  app.quit();
});


