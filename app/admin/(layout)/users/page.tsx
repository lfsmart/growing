'use client'
import React from 'react'
import { Form, Input, Button, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import PageContainer from '../../components/PageContainer';
type Props = {}

export default function Users({}: Props) {
  return (
    <PageContainer title='用户信息'>
      <Form layout='inline'>
        <Form.Item label='名字'>
          <Input placeholder='请输入名字'></Input>
        </Form.Item>
        <Form.Item>
          <Button icon={ <SearchOutlined /> } type='primary'></Button>
        </Form.Item>
      </Form>
      <Table 
        style={ { marginTop: 8 } }
        columns={[
          { title: '序号'},
          { title: '名字'},
          { title: '昵称'},
          { title: '用户名'},
          { title: '头像'},
          { title: '手机号'},
          { title: '年龄'},
          { title: '性别'},
          { title: '操作'},
        ]}
      >
      </Table>
    </PageContainer>
  )
}