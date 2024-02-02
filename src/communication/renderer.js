const { ipcRenderer } = require( 'electron' );

// 渲染进程向主进程发送数据
window.addEventListener( 'DOMContentLoaded', () => {
  const asyncDom = document.querySelector( '#renderToMainByAsync' );
  const syncDom = document.querySelector( '#renderToMainBySync' );

  asyncDom.addEventListener( 'click', () => {
    ipcRenderer.send( 'async-message', '我是渲染进程的一条【异步消息】' );
  });

  // 接受主进程数据
  ipcRenderer.on( 'async-fallback-message', (ev, data ) => {
    console.log({ ev, data });
  })

  syncDom.addEventListener( 'click', () => {
    const val = ipcRenderer.sendSync( 'sync-message', '我是渲染进程的一条【同步消息】' );
    console.log( val );
  });

   // 接受主进程数据
  ipcRenderer.on( 'sync-fallback-message', ( ev, data ) => {
    console.log({ ev, data });
  });

  ipcRenderer.on( 'main-send-message', ( ev, data ) => {
    console.log( ev, data );
  })





})
