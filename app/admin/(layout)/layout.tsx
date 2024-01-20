import React from 'react'
import AntdContainer from '../components/AntdContainer'

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='admin-layout'>
      <AntdContainer>
        {children}
      </AntdContainer>
    </div>
  )
}
