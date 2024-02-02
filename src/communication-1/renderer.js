const { ipcRenderer } = require( 'electron' );

window.addEventListener( 'DOMContentLoaded', () => {
  const openDom = document.querySelector( '#open' );

  openDom.addEventListener( 'click', () => {
    ipcRenderer.send( 'open-new-window');
    // 打开窗口存储数据
    localStorage.setItem('name', `electron lantian ${ Math.random() }`);
  });

})
