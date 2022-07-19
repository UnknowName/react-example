import React from 'react';

import 'antd/dist/antd.min.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';

import './login.css';
import bg from './bg.jpg'
import { apiPrefix } from '../consts'
import { createUUID, setToken, isLogin } from '../utils';

const axios = require('axios');
const index = "/home"

class UserLogin extends React.Component {
    constructor(props) {
        super(props);
        // 不是一定需要设置
        this.state = {...props, imgeStr: "", key: createUUID()};
    };

    getVerifyCode = () => {
      axios.get(apiPrefix + `/auth/verify/code?key=${this.state.key}`).then((response) => {
        this.setState({imgeStr: response.data});
      }).catch(function(error) {
        console.log("failed request", error);
      })
    };

    onFinish = (values) => {
        // console.log('Received values of form: ', values);
        axios.post(apiPrefix + `/auth/login`, {
          username: values.username,
          password: values.password,
          verifyCode: values.verifycode,
          key: this.state.key
          
        }).then((response) => {
          // console.log("post response", response);
          if (response.data.code !== 200) {
            message.error(response.data.msg);
            return
          }
          setToken(response.data.token);
          window.location = index;

        }).catch((error) => {
          console.log("post error", error);
          // error.message = "Request failed with status code 500"
          message.error(error.message)
        })
    };

    componentDidMount() {
      if (isLogin()) {
        window.location = index;
        return
      }
      document.title = "Login";
      this.getVerifyCode();
    }
  
    render() {
        return (
          <div style={{backgroundImage: `url(${bg})`, minWidth: "200px", minHeigh: "200px", backgroundRepeat: "no-repeat", height: "100%", width: "100%", position: "fixed", backgroundSize: "cover"}}>
            <Form name="normal_login" className="login-form" initialValues={{remember: true}} onFinish={this.onFinish}>
              <Form.Item name="username" rules={[{required: true, message: 'Please input your Username!'}]}>
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
              </Form.Item>
        
              <Form.Item name="password" rules={[{required: true, message: 'Please input your Password!'}]}>
                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password"/>
              </Form.Item>

              <div style={{display: "flex", justifyContent: "space-between"}}>
                <Form.Item name="verifycode" rules={[{required: true, message: 'Please input verify code!'}]}>
                  <Input type="text" />
                </Form.Item>
                <div style={{
                  width: "75%", height: "31px",margin:"auto, 10px", 
                  backgroundSize:"100% 100%", backgroundRepeat: "no-repeat",
                  backgroundImage: `url(data:imge/png;base64,${this.state.imgeStr})`
                }} onClick={this.getVerifyCode} >
                </div>
              </div>

              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a className="login-form-forgot" href="">Forgot password</a>
              </Form.Item>
        
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>Or <a href="">register now!</a>
              </Form.Item>
            </Form>
          </div>
        )
    }
}

export default UserLogin;