import { Layout } from 'antd'
import { useState, FC } from 'react'
import { Outlet } from 'react-router-dom'
import { FLayout } from '@/components'

const { Content, Footer, Sider } = Layout

const Root: FC = () => {
  
  const [ collapsed, setCollapsed ] = useState<boolean>( false )

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className='logo' />
        <FLayout.FNav />
      </Sider>
      <Layout className='site-layout'>
        <FLayout.FHeader />
        <Content style={{ margin: '16px 16px 0' }}>
          <div
            className='site-layout-background'
            style={{ padding: 24, minHeight: 360 }}
          >
            <Outlet></Outlet>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}

export default Root
