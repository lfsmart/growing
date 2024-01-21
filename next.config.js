/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {  
    return [  
      {  
        source: '/v3/:path*',  
        destination: 'https://run.mocky.io/v3/:path*'  
      }  
    ]  
  },  
}

module.exports = nextConfig
