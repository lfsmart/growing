const { remote } = require( 'electron' );
const Menu = remote.Menu;

// 渲染进程
window.addEventListener( 'DOMContentLoaded', () => {

  // 定义菜单内容
  const menus = Menu.buildFromTemplate([
    { label: 'Run Code' },
    { label: '转到定义' },
    { type: 'separator' },
    { 
      label: '其他功能',
      click: () => {
        console.log( '其它功能选项被点击了' );
      }
    },
  ]);

  // 创建菜单
  window.addEventListener( 'contextmenu', (ev) => {
    ev.preventDefault();
    menus.popup({
      window: remote.getCurrentWindow()
    })
  }, false )


})
