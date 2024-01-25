import React, { useState, useCallback, forwardRef, useImperativeHandle } from 'react'
import { Card, Form, Input, Button, Table, Modal, Space, message, Popconfirm, Image, type ModalProps } from 'antd'
import MyUpload from './../../../../components/MyUpload'
import MyEditor from './../../../../components/MyEditor'

const initialValues: Article.RowItem = {
  id: '',
  title: '',
  desc: '',
  image: '',
  content: '',
}

type Props = {
  setQuery: (data: Article.Query) => void
}

export const Edit = forwardRef<Article.ModalEditRef, Props>(({ setQuery }, ref) => {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  useImperativeHandle(ref, () => ({
    // 初始化函数
    show(data) {
      setOpen(true)
      form.setFieldsValue(data)
    },
    close() {
      setOpen(false)
    },
  }))

  const createOrModify = useCallback(async ({ id, ...values }: Article.RowItem) => {
    if (id) {
      // 修改
      const data = await fetch(`/api/admin/articles/${id}`, {
        method: 'PUT',
        body: JSON.stringify(values),
      }).then((res) => res.json())
      message.success('更新成功')
    } else {
      await fetch('/api/admin/articles', {
        method: 'POST',
        body: JSON.stringify(values),
      }).then((res) => res.json())
      message.success('添加成功')
    }
    setQuery({
      pageIndex: 1,
      pageSize: 10,
      title: '',
    })
    setOpen(false)
  }, [])

  return (
    <Modal title='编辑' 
      open={open}
      onCancel={() => setOpen(false)} 
      destroyOnClose={false} 
      maskClosable={false} 
      width={'45vw'} 
      onOk={form.submit}
    >
      <Form 
        layout='vertical' 
        form={form} 
        onFinish={createOrModify} 
        preserve={false} 
        initialValues={initialValues}
      >
        <Form.Item label='文章ID' name='id' hidden>
          <Input />
        </Form.Item>
        <Form.Item label='名字' name='title' rules={[{ required: true, message: '标题不能为空' }]}>
          <Input placeholder='请输入名字' />
        </Form.Item>
        <Form.Item label='简介' name='desc'>
          <Input.TextArea placeholder='请输入简介'></Input.TextArea>
        </Form.Item>
        <Form.Item label='封面' name='image'>
          <MyUpload></MyUpload>
        </Form.Item>
        <Form.Item label='详情' name='content'>
          <MyEditor></MyEditor>
        </Form.Item>
      </Form>
    </Modal>
  )
})
