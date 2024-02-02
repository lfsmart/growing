const { remote, shell, ipcRenderer, Notification } = require( 'electron' );
const path = require( 'path' );
window.addEventListener( 'DOMContentLoaded', () => {
  const dispatchDom = document.querySelector( '#dispatch' );
  dispatchDom.addEventListener( 'click', () => {
    const notification = new window.Notification('title-electron',{
      body: '学习 electron 相关 API ',
      icon: './apple-touch-icon.png',
    });

    // 显示
    notification.addEventListener( 'show', () => {
      console.log( 'show' );
    });

    // 点击卡片
    notification.addEventListener( 'click', () => {
      console.log( 'click' );
    });

    // 关闭通知消息
    notification.addEventListener( 'close', () => {
      console.log( 'close' );
    });

    // 卡片消息报错
    notification.addEventListener( 'error', () => {
      console.log( 'error' );
    });


  })

})
