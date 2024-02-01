const { remote } = require( 'electron' );

// 渲染进程
window.addEventListener( 'DOMContentLoaded', () => {
  const closeDom = document.querySelector('#close');
  const modalDom = document.querySelector( '#modal-box' );
  const confirmDom = document.querySelector( '#confirm' );
  const cancelDom = document.querySelector( '#cancel' );
  const mainWin = remote.getCurrentWindow();

  window.onbeforeunload = function(){
    modalDom.classList.add('show');
    return false;
  }

  closeDom.addEventListener('click', () => {
    mainWin.close();
  }, false );

  cancelDom.addEventListener( 'click', () => {
    modalDom.classList.remove('show');
  }, false );

  confirmDom.addEventListener( 'click', () => {
    mainWin.destroy()
  }, false )

  

})
