'use client'
import React from 'react'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
export default ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider locale={ zhCN }>
      <div className='admin-layout'>
        { children }
      </div>
    </ConfigProvider>
  )
}
