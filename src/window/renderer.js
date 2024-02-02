const { remote } = require( 'electron' );
const path = require( 'path' );

// 渲染进程
window.addEventListener( 'DOMContentLoaded', () => {

  const btnDom = document.querySelector('#open');

  btnDom.addEventListener( 'click', () => {
    let subWin = new remote.BrowserWindow({
      parent: remote.getCurrentWindow(),
      width: 200,
      height: 200,
      modal: true,
    });
    subWin.loadFile( path.join(__dirname, 'sub.html') );
    subWin.on( 'close', () => {
      subWin = null;
    })
  }, false )

})
