import React from 'react'
import { Card } from 'antd';

type Props = {
  children?: React.ReactNode,
  title?: string;
}

export default function PageContainer({ children, title }: Props) {
  return (
    <Card title={ title }>
      { children }
    </Card>
  )
}