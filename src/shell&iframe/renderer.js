const { remote, shell, ipcRenderer } = require( 'electron' );
const path = require( 'path' );

window.addEventListener( 'DOMContentLoaded', () => {

  const openLinkDom = document.querySelector( '#openLink' );
  const openFolderDom = document.querySelector( '#openFolder' );
  const iframeDom = document.querySelector( '#webview' );

  openLinkDom.addEventListener( 'click', (e) => {
    const url = openLinkDom.getAttribute( 'href' );
    shell.openExternal( url ); // 使用默认浏览器打开链接
    e.preventDefault()
  });

  openFolderDom.addEventListener( 'click', () => {
    shell.showItemInFolder( path.resolve( __dirname ) ); // 打开目录
  });

  ipcRenderer.on( 'openUrl', (e, data) => {
    iframeDom.src = 'https://react.docschina.org/';
  })

})
