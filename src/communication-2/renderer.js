const { ipcRenderer } = require( 'electron' );

window.addEventListener( 'DOMContentLoaded', () => {
  const openDom = document.querySelector( '#open' );

  openDom.addEventListener( 'click', () => {
    ipcRenderer.send( 'open-new-window', '来自 renderer.js 的进程数据' );
  });

  ipcRenderer.on( 'sub-send-renderer', ( ev, data ) => {
    console.log( data, '我是 renderer, 我收到了来自 sub 渲染进程的数据了' );
  });

})
