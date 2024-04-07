
import { Breadcrumb, Layout } from 'antd';
import { FC } from 'react';

const { Header } = Layout;

const FHeader: FC = () => {
  return (
    <Header className='site-layout-background' style={{ padding: 0 }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>Bill</Breadcrumb.Item>
      </Breadcrumb>
    </Header>
  )
}

export default FHeader;
