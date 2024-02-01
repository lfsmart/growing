const { remote } = require( 'electron' );

// 渲染进程
window.addEventListener( 'DOMContentLoaded', () => {
  const zoominDom = document.querySelector('#zoomin');
  const zoomoutDom = document.querySelector('#zoomout');
  const closeDom = document.querySelector('#close');
  const mainWin = remote.getCurrentWindow();

  // 最小化
  zoominDom.addEventListener( 'click', () => {
    if( !mainWin.isMinimized() ){
      mainWin.minimize()
    }
  }, false );

  // 最大化
  zoomoutDom.addEventListener( 'click', () => {
    if( !mainWin.isMaximized() ){
      mainWin.maximize(); // 最大化
    }else {
      mainWin.restore(); // 恢复
    }
  }, false );

  // 关闭
  closeDom.addEventListener( 'click', () => {
    mainWin.close();
  }, false );

}, false )
