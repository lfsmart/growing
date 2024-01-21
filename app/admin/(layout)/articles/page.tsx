'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Card, Form, Input, Button, Table, Modal, Space, message, Popconfirm, Image } from 'antd'
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import MyUpload from './../../components/MyUpload';
type RowItem = {
  id: string;
  title: string;
  desc?: string;
  image?: string;
}

type Query = {
  pageIndex: number;
  pageSize: number;
  title: string;
}

const defaultQuery: Query = {
  pageIndex: 1,
  pageSize: 10,
  title: ''
}

export default () => {
  const [ open, setOpen ] = useState(false)
  const [ list, setList ] = useState<RowItem[]>([])
  const [ query, setQuery ] = useState<Query>(defaultQuery);
  const [ myForm ] = Form.useForm();
  const [ searchFrom ] = Form.useForm();
  const [ total, setTotal ] = useState(0);

  const initialValues: RowItem = {
    id: '',
    title: '',
    desc: '',
    image: ''
  }

  const createOrModify = useCallback( async ({ id, ...values }: RowItem) => {

    if( id ){
      // 修改
      const data = await fetch(`/api/admin/articles/${id}`,{
        method: 'PUT',
        body: JSON.stringify(values),
      }).then( res => res.json());
      message.success( '更新成功' )
    }else {

      await fetch('/api/admin/articles',{
        method: 'POST',
        body: JSON.stringify(values),
      }).then( res => res.json());
      message.success( '添加成功' )
    }
    setQuery({ ...defaultQuery });
    setOpen( false );
  }, []);

  // 触发列表渲染
  useEffect( () => {
    const { pageIndex, pageSize, title } = query;
    fetch( `/api/admin/articles?pageIndex=${pageIndex}&pageSize=${pageSize}&title=${title}` ).then( res => res.json() ).then( res => {
      setList( res.data.list || [] );
      setTotal( res.data.total );
    })
  }, [ query ]);

  const add = useCallback(() => {
    setOpen( true );
    myForm.setFieldsValue(initialValues);
  }, [])

  const edit = useCallback((rowData: RowItem) => {
    setOpen( true );
    myForm.setFieldsValue( rowData );
  }, [])

  const remove = useCallback(async (rowData: RowItem) => {
    await fetch(`/api/admin/articles/${rowData.id}`, {
      method: 'DELETE'
    }).then( res => res.json());
    setQuery({ ...defaultQuery });
  }, []);

  const search = ({ title}: { title: string }) => {
    setQuery({ ...query, title });
  }

  return (
    <Card
      title='文章管理'
      extra={
        <Button type='primary' onClick={ add }>
          <PlusOutlined />
        </Button>
      }
    >
      <Form layout='inline' form={searchFrom} onFinish={ search }>
        <Form.Item label='标题' name='title'>
          <Input placeholder='请输入关键词'  />
        </Form.Item>
        <Form.Item>
          <Button icon={<SearchOutlined />} type='primary' onClick={ () => searchFrom.submit() }></Button>
        </Form.Item>
      </Form>
      <Table 
        size='small' 
        bordered 
        style={{ marginTop: 8 }} 
        rowKey='id'
        dataSource={ list }
        pagination={
          { 
            position: ['bottomRight'],
            size: 'small',
            current: query.pageIndex,
            hideOnSinglePage: false,
            showSizeChanger: true,
            pageSize: query.pageSize,
            pageSizeOptions: [ 10, 50, 100, 300 ],
            showQuickJumper: true,
            showTitle: true,
            total,
            showTotal: () => `总数：${total}` ,
            onChange:(pageIndex, pageSize) => {
              setQuery({
                pageIndex,
                pageSize,
                title: query.title
              })
            }
          }
          
        }
        columns={[{ 
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
          title: '封面',
          align: 'center',
          width: 120,
          dataIndex: 'image',
          render: (val, row) => val && <Image width={ 80 } src={ val } />
        },{ 
          title: '操作',
          align: 'center',
          width: 120,
          render: (value, rowData) => {
            return <Space> 
              <Button size='small' icon={<EditOutlined />} type='primary' onClick={ () => edit( rowData ) }></Button>
              <Popconfirm title='是否确认删除？' onConfirm={ () => remove( rowData )}>
                <Button size='small' icon={<DeleteOutlined />} type='primary' danger></Button>
              </Popconfirm>
            </Space>
          } 
        }]}
        
        
      ></Table>
      
      <Modal 
        title='编辑' 
        open={open} 
        onCancel={() => setOpen(false)} 
        destroyOnClose={ true }
        maskClosable={ false }
        onOk={() => {
        myForm.submit();
        
      }}>
        <Form 
          layout='vertical' 
          form={ myForm } 
          onFinish={ createOrModify }
          preserve={ false }
          initialValues={ initialValues }
        >
          <Form.Item label='文章ID' name='id' hidden>
            <Input />
          </Form.Item>
          <Form.Item 
            label='名字' 
            name='title' 
            rules={[
              { required: true, message: '标题不能为空' }
            ]}
          >
            <Input placeholder='请输入名字' />
          </Form.Item>
          <Form.Item label='简介' name='desc'>
            <Input.TextArea placeholder='请输入简介'></Input.TextArea>
          </Form.Item>
          <Form.Item label='封面' name='image' >
            <MyUpload></MyUpload>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  )
}
