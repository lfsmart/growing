'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Card, Form, Input, Button, Table, Modal, Space, message, Popconfirm, Image } from 'antd'
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Edit } from './_components'

const defaultQuery: Article.Query = {
  pageIndex: 1,
  pageSize: 10,
  title: '',
}


export default () => {
  const [ list, setList ] = useState<Article.RowItem[]>([])
  const [ query, setQuery ] = useState<Article.Query>(defaultQuery);
  const [ searchFrom ] = Form.useForm();
  const [ total, setTotal ] = useState(0);
  const modalEditRef = useRef<Article.ModalEditRef>(null);

  const initialValues: Article.RowItem = {
    id: '',
    title: '',
    desc: '',
    image: '',
    content: '',
  }

  // 触发列表渲染
  useEffect( () => {
    const { pageIndex, pageSize, title } = query;
    fetch( `/api/admin/articles?pageIndex=${pageIndex}&pageSize=${pageSize}&title=${title}` ).then( res => res.json() ).then( res => {
      setList( res.data.list || [] );
      setTotal( res.data.total );
    })
  }, [ query ]);

  const remove = useCallback(async (rowData: Article.RowItem) => {
    await fetch(`/api/admin/articles/${rowData.id}`, {
      method: 'DELETE'
    }).then( res => res.json());
    setQuery({ ...defaultQuery });
  }, []);

  const search = ({ title }: { title: string }) => {
    setQuery({ ...query, title });
  }


  const handClick = useCallback(( type: string, rowData?: Article.RowItem | Article.Query ) => {
    switch( type ){
      case 'add':  modalEditRef.current!.show( initialValues ); break;
      case 'edit': modalEditRef.current!.show( rowData as Article.RowItem); break;
      case 'remove': remove( rowData as Article.RowItem ); break;
      case 'search': search( rowData as Article.Query ); break;
    }
  }, []);


 

  
  return (
    <Card
      title='文章管理'
      extra={
        <Button type='primary' onClick={ () => handClick( 'add' ) }>
          <PlusOutlined />
        </Button>
      }
    >
      <Form layout='inline' 
        form={searchFrom} 
        onFinish={ values => handClick( 'search', values ) }
        initialValues={ { title: '' }}
      >
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
          render: (val, row) => val && <Image width={ 80 } alt="cover" src={ val } />
        },{ 
          title: '操作',
          align: 'center',
          width: 120,
          render: (value, rowData) => {
            return <Space> 
              <Button size='small' icon={<EditOutlined />} type='primary' onClick={ () => handClick( 'edit', rowData ) }></Button>
              <Popconfirm title='是否确认删除？' onConfirm={ () => handClick( 'remove', rowData ) }>
                <Button size='small' icon={<DeleteOutlined />} type='primary' danger></Button>
              </Popconfirm>
            </Space>
          } 
        }]}
      ></Table>
     <Edit ref={ modalEditRef } setQuery={ setQuery }></Edit>
    </Card>
  )
}
