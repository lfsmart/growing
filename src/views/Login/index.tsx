import { useState, useEffect, FC, ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '@/store/actions';
import { Input, Space, Button } from 'antd'
import { initLoginBg } from '@/tools'
import styles from './index.module.less'

interface FormData {
  username: string;
  pwd: string;
  code: string;
}

const Login: FC = () => {
  const dispath = useDispatch();
  const { initData } = useSelector(({ common: { initData } }: RootState) => ({
    initData
  }));
  useEffect(() => {
    initLoginBg()
    window.addEventListener('resize', initLoginBg, false)
    return () => window.removeEventListener('resize', initLoginBg)
  }, []);

  const [formData, setFormData] = useState<FormData>({
    username: '',
    pwd: '',
    code: ''
  });

  const handleChange = (bType: keyof FormData, e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [bType]: e.target.value
    })
  }

  const handleClick = () => {
    // dispath(
    //   actions.aCommon.init({
    //     ...initData,
    //     age: ++initData.age
    //   })
    // )
    dispath(actions.aCommon.initAsync({

    }))
    console.log(formData, '123456789');
  }

  return (
    <div className={styles.loginPage}>
      <canvas id='canvas' className='f-db'></canvas>
      <div className={styles.loginBox}>
        <div className={styles.title}>
          <h1>前端{initData.age}</h1>
          <p>strive</p>
        </div>
        <div className="form f-tac">
          <Space direction="vertical" className="f-df" size='middle'>
            <Input placeholder='用户名' onChange={(e) => handleChange('username', e)}></Input>
            <Input.Password placeholder="请输入密码" onChange={(e) => handleChange('pwd', e)} />
            <div className="captchBox f-df">
              <Input placeholder='验证码' onChange={(e) => handleChange('code', e)}></Input>
              <div className="captchImg f-fhvc f-plr10">12121212121</div>
            </div>
            <Button type='primary' className='f-w100' onClick={handleClick}>登录</Button>
          </Space>
        </div>
      </div>
    </div>
  )
}
export default Login
