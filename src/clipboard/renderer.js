const { remote, shell, ipcRenderer, clipboard, nativeImage } = require( 'electron' );
const path = require( 'path' );
window.addEventListener( 'DOMContentLoaded', () => {
  const copyBtn = document.querySelector( '#copyBtn' );
  const pasteBtn = document.querySelector( '#pasteBtn' );
  const clipBtn = document.querySelector( '#clipBtn' );
  const copyInput = document.querySelector( '#copyInput' );
  const pasteInput = document.querySelector( '#pasteInput' );

  copyBtn.onclick = function(){
    // 复制
    if( copyInput.value ){
      clipboard.writeText( copyInput.value )
    }
  }

  pasteBtn.onclick = () => {
    // 粘贴
    const val = clipboard.readText(); // 粘贴
    pasteInput.value = val
  }

  clipBtn.onclick = () => {
    // 将图片放置于剪切板当中要求图片类型属于 nativeImage 实例
    const imgPath = path.resolve( __dirname, 'apple-touch-icon.png' );
    let oImage = nativeImage.createFromPath( imgPath );
    clipboard.writeImage( oImage );

    // 将剪切板肿的图片作为 dom 显示在界面上
    oImage = clipboard.readImage()
    const img = new Image()
    img.src = oImage.toDataURL()
    document.body.appendChild( img )
  }
})
