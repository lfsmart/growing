import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import path from 'path';
import fs from 'fs';
import dayjs from 'dayjs';

const saveFile = async (blob: File) => {
  const dirName = '/uploads/' + dayjs().format('YYYY-MM-DD');
  const uploadDir = path.join(process.cwd(), 'public'+ dirName );
  fs.mkdirSync(uploadDir, { // 创建目录
    recursive: true,
  });
  const fileName = randomUUID() + '.png';
  const arrayBuffer = await blob.arrayBuffer();
  fs.writeFileSync(uploadDir + '/' + fileName, new DataView( arrayBuffer  ) );
  return dirName + '/' + fileName; // 返回接口路径
 
}

// 上传图片
export const POST = async (req: NextRequest) => {
  const data = await req.formData();
  const fileName = await saveFile( data.get('file') as File );
  return NextResponse.json({
    errno: 0,
    message: '上传成功',
    data: {
      url: fileName,
      alt: '',
      href: ''
    }
  });
}