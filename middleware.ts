import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // console.log( request, '123456' );
  const { pathname } = request.nextUrl
  if( pathname.startsWith( '/admin' ) ){
    // 管理后台
    // 是否登录
    const logined = request.cookies.get('admin-token');

    if( logined && pathname.startsWith('/admin/login') ){ // 存在 cookie
      return NextResponse.redirect( new URL('/admin/dashboard', request.url ) );
    }else if( !logined && !pathname.startsWith('/admin/login')) {
      return NextResponse.redirect( new URL('/admin/login', request.url ) );
    }
  }
  // console.log( '中间件执行了' );
  // return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/about/:path*',
// }