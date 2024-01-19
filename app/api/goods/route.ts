import { NextRequest, NextResponse } from "next/server"
import prisma from '@/db';
export const GET = async () => {
  const data = await prisma.goods.findMany({
    orderBy: {
      createAt: 'desc'
    }
  });
  return NextResponse.json({
    success: true,
    errorMessage: '',
    data
  })
}

export const POST = async ( req: NextRequest ) => {
  const data = await req.json();
  await prisma.goods.create({
    data
  });
  return NextResponse.json({
    success: true,
    errorMessage: '创建成功',
    data: {}
  })
}