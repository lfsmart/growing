const getTempletePath = ( dirname ) => {
  const rootpath = process.cwd() + '\\' + dirname.split('\\').slice(-2).join('\\');
  return (path='index.html') => rootpath + '\\' + path
}

module.exports = {
  getTempletePath
}