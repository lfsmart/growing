import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if( pathname.startsWith( '/admin' ) ){
    // 管理后台
    // 是否登录
    if( !pathname.startsWith('/admin/login') ){
      if(request.cookies.get('admin-token') ){
        // 已经登录
      }else {
        // 跳转到登录页
        return NextResponse.redirect( new URL('/admin/login', request.url ) );
      }

    }

  }
  console.log( '中间件执行了' );
  // return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/about/:path*',
// }