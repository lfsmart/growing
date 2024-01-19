export default (): Promise<React.ReactNode> => {
  return new Promise( (resolve, reject ) => {
    setTimeout( () => {
      resolve( <div className='async-component'>我是异步组件</div> )
    }, 3000);
  })
}
