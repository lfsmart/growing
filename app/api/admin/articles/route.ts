import { NextRequest, NextResponse } from "next/server"
import { prisma } from '@/db';

export const GET = async ( req: NextRequest ) => {
  const { searchParams } = req.nextUrl
  const pageSize = Number( searchParams.get( 'pageSize' ) || 10 );
  const pageIndex = Number( searchParams.get( 'pageIndex' ) || 1 );
  const title = searchParams.get( 'title' ) || '';
  const data = await prisma.article.findMany({
    where: {
      title: {
        contains: title,
      }
    },
    orderBy: {
      createAt: 'desc'
    },
    take: pageSize, // 取多少条数据
    skip: ( pageIndex - 1) * pageSize // 跳过
  });
  const total = await prisma.article.count({
    where: {
      title: {
        contains: title,
      }
    }
  })
  return NextResponse.json({
    success: true,
    errorMessage: null,
    data: {
      list: data,
      pageIndex,
      total,
      pages: Math.ceil( total / +pageSize )
    },
  })
}

export const POST = async ( req: NextRequest ) => {
  const data = await req.json();
  await prisma.article.create({
    data
  });

  return NextResponse.json({
    success: true,
    errorMessage: '创建成功',
    data: {}
  })

}