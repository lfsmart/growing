'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Layout, Menu, Button, theme } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, DashboardFilled } from '@ant-design/icons'

const { Header, Sider, Content } = Layout
export default function AntdContainer({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname();
  const [ selectedKeys, setSelectedKeys ] = useState<string[]>([pathname]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();

  const handleClick = useCallback( (key: string) => {
    router.push( key );
    setSelectedKeys([key])
  }, [])

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='demo-logo-vertical' />
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['/admin/dashboard']}
          selectedKeys={ selectedKeys }
          onClick={ ({ key }) => handleClick( key ) }
          items={[
            {
              key: '/admin/dashboard',
              icon: <DashboardFilled />,
              label: '看板',
            },
            {
              key: '/admin/users',
              icon: <UserOutlined />,
              label: '用户信息',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
