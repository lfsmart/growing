const { remote } = require( 'electron' );
const Menu = remote.Menu;
const MenuItem = remote.MenuItem;

// 渲染进程
window.addEventListener( 'DOMContentLoaded', () => {
  const menuConDom = document.querySelector('#menuCon');
  const addMenuDom = document.querySelector( '#addMenu' );
  const addItemDom = document.querySelector( '#addItem' );
  const submenus = new Menu(); // 预留菜单

  addMenuDom.addEventListener( 'click', () => {
    // 创建菜单
    const menuItemFile = new MenuItem({ label: '文件', type: 'normal' });
    const menuItemEdit = new MenuItem({ label: '编辑', type: 'normal' });
    const customMenu = new MenuItem({ label: '自定义菜单项', submenu: submenus })

    const menus = new Menu();

    menus.append( menuItemFile );
    menus.append( menuItemEdit );
    menus.append( customMenu );

    Menu.setApplicationMenu( menus );

  });

  addItemDom.addEventListener( 'click', () => {
    const val = menuConDom.value.trim();
    if( val ){
      submenus.append(
        new MenuItem({
          label: val,
          type: 'normal'
        })
      )
      menuConDom.value = ''
    }
  });







 
  

})
