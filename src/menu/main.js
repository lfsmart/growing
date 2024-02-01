const { app, BrowserWindow, Menu } = require( 'electron' );
const path = require( 'path' );

// 创建窗口
function createWindow(){
  let mainWin = new BrowserWindow({
    width: 800,
    height: 500,
    show: false,
    title: '自定义菜单',
    icon: path.join( __dirname, 'apple-touch-icon.png' ),
    webPreferences: {
      nodeIntegration: true, // 启用 node 环境
      contextIsolation: false,
      enableRemoteModule: true, // 启用远程模块
    }
  });

  // 生成需要的菜单项
  const menus = Menu.buildFromTemplate([
    { 
      label: 'role',
      sublabel: '角色',
      submenu: [
        { label: '复制', role: 'copy' },
        { label: '剪切', role: 'cut' },
        { label: '粘贴', role: 'paste' },
        { label: '最小化', role: 'minimize' },
      ] 
    },
    { 
      label: 'type',
      sublabel: '类型',
      submenu: [
        { label: '选项1', type: 'checkbox' },
        { label: '选项2', type: 'checkbox' },
        { label: '选项3', type: 'checkbox' },
        { type: 'separator' },
        { label: '单向选项1', type: 'radio' },
        { label: '单向选项2', type: 'radio' },
        { type: 'separator' },
        { label: 'windows', type: 'submenu', role: 'windowMenu' },
      ]
    },
    {
      label: '其他',
      submenu: [
        { label: '打开', icon: path.join( __dirname, 'file-open.png' ), accelerator: 'ctrl + o', click: () => {
          console.log( '打开' );
        } }
      ]
    }
  ]);

  // 将自定义菜单添加代应用里
  // Menu.setApplicationMenu( menus );

  mainWin.loadFile( path.join( __dirname, 'index.html' ) );
  mainWin.on( 'ready-to-show', () => {
    mainWin?.show();
  })
  // 开启渲染进程 调试工具
  mainWin.webContents.openDevTools()
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


