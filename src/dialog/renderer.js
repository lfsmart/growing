const { ipcRenderer, remote } = require( 'electron' );

window.addEventListener( 'DOMContentLoaded', () => {
  const btnDom = document.querySelector( '#btn' );
  const btnErrDom = document.querySelector( '#btn-err' );
  btnDom.addEventListener( 'click', () => {
    remote.dialog.showOpenDialog({
      defaultPath: __dirname, // 当前路径
      buttonLabel: '请选择',
      title: 'electron',
      properties: [
        // 'openFile',
        // 'openDirectory',
        'multiSelections',
      ],
      filters: [
        { "name": "代码文件", extensions: [ 'js', 'json', 'html' ] },
        { "name": "图片文件", extensions: [ 'ico', 'jpeg', 'png' ] },
        { "name": "媒体类型", extensions: [ 'avi', 'mp4', 'mp3' ] },
      ]
    }).then( res => {
      console.log(res);
    })
  })

  btnErrDom.addEventListener( 'click', () => {
    remote.dialog.showErrorBox( '自定义标题', '当前错误内容' );
  })

})
