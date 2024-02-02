const { ipcRenderer } = require( 'electron' );

window.addEventListener('DOMContentLoaded', () => {
  const sendDom = document.querySelector( '#send' );
  
  // 给 renderer.js 渲染进程发送数据
  sendDom.addEventListener( 'click', () => {
    ipcRenderer.send( 'sub-send-renderer', '来自 sub 进程的信息数据' );
  });

  ipcRenderer.on( 'main-send-sub', (ev, data) => {
    console.log( ev, data );
  });


  
});