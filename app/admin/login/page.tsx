'use client'
import { Card, Form, Button, Input } from 'antd'
import { useRouter } from 'next/navigation';
type FieldType = {
  username?: string;
  password?: string;
};
const onFinish = (values: FieldType, router: ReturnType<typeof useRouter>) => {
  fetch( '/api/admin/login', {
    method: 'POST',
    body: JSON.stringify( values )
  }).then( res => res.json()).then( (res) => {
    console.log( router );
    router.replace('/admin/dashboard');
  })
}
export default () => {

  const router = useRouter()
 
  return (
    <div className='login-form pt-20'>
      <Card title='Next 全栈管理后台' className='w-4/5 mx-auto'>
        <Form 
          labelCol={{span: 3}} 
          onFinish={ (v) => onFinish( v, router ) }
          autoComplete="off"
        >
          <Form.Item label='用户名' name='username'>
            <Input placeholder='请输入用户名'></Input>
          </Form.Item>
          <Form.Item label='密码' name='password'>
            <Input.Password placeholder='请输入密码' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' block>登录</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
