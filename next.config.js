/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {  
    return [  
      // 阿里上传图片的接口
      {  
        source: '/v3/:path*',  
        destination: 'https://run.mocky.io/v3/:path*'  
      }  
    ]  
  },  
}

module.exports = nextConfig
