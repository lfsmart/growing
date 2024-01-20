import { NextRequest, NextResponse } from "next/server"


export const POST = async ( req: NextRequest ) => {
  // const data = await req.json();
  // await prisma.goods.create({
  //   data
  // });
  return NextResponse.json({
    success: true,
    errorMessage: '登录成功',
    data: {},
  },{
    headers: {
      'Set-cookie': 'admin-token=123;Path=/'
    }
  })
}