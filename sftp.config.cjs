
const compressing = require( 'compressing' );
const path = require( 'path' );
const { Client } = require( 'ssh2' );
const { execSync } = require( 'child_process' );
const { npm_lifecycle_event } = process.env;

// 创建发布工作流
function PublishWorkFlow(){};

PublishWorkFlow.prototype.init = function(serverConfigList) {
  const defaultOPtions = [{
    name: "易飞轮-测试环境",//服务器名称（自定义）
    key: 'dev-1', // npm run publish:dev  
    path: '/www/wwwroot/sea-compass-ai-rpa',
    conf: {
      host: '47.242.27.24', // 服务器地址
      port: '22', // 端口号
      username: 'root', // 用户名
      password: "chuhaixiang@r1oot123#$%.." // 密码
    },
  }, {
    name: "虚拟机测试",//服务器名称（自定义）
    key: 'dev', // npm run publish:dev  
    path: '/data/h5', // 部署的根目录
    conf: {
      host: '192.168.31.129', // 服务器地址
      port: '22', // 端口号
      username: 'root', // 用户名
      password: "root" // 密码
    },
  }];
  const servers = serverConfigList || defaultOPtions;
  const env = npm_lifecycle_event.replace( /^publish\:(.+)$/, '$1' );
  const index = servers.findIndex( item => item.key === env );
  const server = servers[ index ];
  if( !server ){
    throw new Error( 'server is not exist' );
  }
  const paths = server.path.split( '/' );
  const projectDir = paths.slice( -1 ).join( '/' );
  server.rootDir = paths.slice( 0, -1 ).join( '/' );
  server.projectDir = projectDir;
  this.server = server;
  this.client = new Client();
}

PublishWorkFlow.prototype.loginClient = function() {
  const { client, server } = this;
  return new Promise( ( resolve ) => {
    client.on( 'ready', () => {
      console.info( `---${ server.name } 服务器连接成功！` );
      resolve()
    })

    client.on( 'error', () => {
      console.log( `---${ server.name } 服务器连接失败！` );
    });

    client.on( 'end', () => {
      console.log( `服务器:【${ server.name }】成功断开连接！` );
    });

    client.on( 'close', (err) => {
      if( err ){
        console.error( `---${ server.name } 服务器退出出错！` )
      }
    })
    client.connect( server.conf )
  });

}

PublishWorkFlow.prototype.uploadFile = function(){
  const { client, server } = this;
  return new Promise( (resolve, reject ) => {
    client.sftp( ( err, sftp ) => {
      if( err ){
        throw new Error( err );
      }

      try{
        sftp.fastPut( path.resolve( __dirname, 'dist.zip' ),  `${ server.rootDir }/dist.zip`, (err) => {
          if( err ){
            console.error(`服务器：${ server.name }，上传失败！----` );
            client.end();
            reject()
          }else {
            // 上传成功
            console.error(`服务器：${ server.name }，上传成功!` );
            resolve()
          }
        })
      }catch(e){
        console.log( e, '------' );
      }
    })
  })
}

PublishWorkFlow.prototype.unzip = function(){
  const { client, server } = this;
  client.shell( ( err, stream ) => {
    if( err ) throw new Error( err );
    let buf = '';
    stream.on( 'close', err => {
      client.end();
      if( err ){
        console.error( err );
        return
      }
      console.log(`==========【${server.name}】=========`);
      console.log(`            发布成功!               `);
      console.log(`=====================================`);
      execSync( 'rm -rf dist*' ); // 需要安装 git 否则报错
    }).on( 'data', data => {
      buf += data;
      console.log( buf );
    });

    stream.write( 'cd ' + server.rootDir + ' && unzip dist.zip \n' );
    stream.write( `mv -f ${ server.projectDir } $(date +%Y-%m-%d) && mv dist ${ server.projectDir }\n` );
    stream.write( `rm -rf dist.zip \nexit\n` );
    stream.end();
  });
}

PublishWorkFlow.prototype.zip = async function() {
  try{
    await compressing.zip.compressDir( 'dist/', 'dist.zip' );
    console.log('zip success!');
    return Promise.resolve();
  }catch( e ){
    console.log(e);
    return Promise.reject();
  }
};

PublishWorkFlow.prototype.deploy = async function(){
  this.init()
  await this.zip(); // 打包
  await this.loginClient(); // 登录服务器
  await this.uploadFile(); // 上传文件
  this.unzip(); // 部署了
}

new PublishWorkFlow().deploy();



