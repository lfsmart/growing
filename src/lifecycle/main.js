/**
 * 功能：主进程
 */
const { app, BrowserWindow } = require( 'electron' );
const { getTempletePath } = require( './../tools' );

const rootDir = getTempletePath(__dirname);
// 创建窗口
function createWindow(){
  let mainWin = new BrowserWindow({
    width: 900,
    height: 500
  });
  mainWin.loadFile( rootDir() );

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

app.on( 'ready', createWindow );

// 默认退出应用程序
app.on('window-all-closed', () => {
  console.log( '4 -> window-all-closed' );
  app.quit();
});
app.on( 'before-quit', () => {
  console.log( '5 -> before-quit' )
})
app.on( 'will-quit', () => {
  console.log( '6 -> will-quit' )
})

app.on( 'quit', () => {
  console.log( '7 -> quit' );
})

