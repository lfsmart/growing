import { NextResponse } from "next/server"
export const GET = () => {
  return NextResponse.json({
    success: true,
    errorMessage: '',
    data: [
      { id: 1, name: '夜兰' },
      { id: 2, name: '行秋' },
    ]
  })
}