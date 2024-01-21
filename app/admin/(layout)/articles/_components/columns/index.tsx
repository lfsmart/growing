import React from 'react';
import { Button, Space, TableProps } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export const columns = (cb: () => void ): TableProps['columns'] => {
  const edit = (rowData: any) => {
    // cb({
    //   type: 'edit'
    // })
  }
  const remove = (rowData: any) => {
    // cb('')
  }
  return [{ 
    title: '序号', 
    width: 60,
    align: 'center',
    render: (v, r, i ) => i + 1 
  }, { 
    title: '标题', 
    dataIndex: 'title',
    render: (value, rowData, index) => value
  }, { 
    title: '简介', 
    dataIndex: 'desc'
  }, { 
    title: '操作',
    width: 120,
    render: (value, rowData) => {
      return <Space> 
        <Button size='small' icon={<EditOutlined />} type='primary' onClick={ () => edit( rowData ) }></Button>
        <Button size='small' icon={<DeleteOutlined />} type='primary' danger onClick={ () => remove( rowData ) }></Button>
      </Space>
    } 
  }]
} 