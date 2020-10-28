import React, { Component } from 'react';
import { Form, Input,Button, Row, Col } from 'antd';
import { UserOutlined, UnlockOutlined }  from '@ant-design/icons';
import CryptoJs from 'crypto-js';
import { validate_password } from '../../utils/validate';
import { Login } from '../../api/account';
import Code from '../../components/code/index';
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            code: '',
            module: 'login',
            loading: false
        }
    }

    onFinish = () => {
        const requestData = {
            username: this.state.username,
            password: CryptoJs.MD5(this.state.password).toString(),
            code: this.state.code
        }
        this.setState({
            loading: true
        })
        Login(requestData).then(response => {
           this.setState({
               loading: false
           })
        }).catch(error => {
            this.setState({
                loading: false
            })
        })
    }

    inputChangeUsername = (e) => {
        let value = e.target.value;
        this.setState({
            ...this.state,
            username: value
        })
    }

    inputChangePassword = (e) => {
        let value = e.target.value;
        this.setState({
            ...this.state,
            password: value
        })
    }

    inputChangeCode = (e) => {
        let value = e.target.value;
        this.setState({
            ...this.state,
            code: value
        })
    }

    toggleForm = () => {
        this.props.switchForm('rester');
    }

    render() {
        const { username, module, loading } = this.state;
        return (
            <div>
                <div className='form-header'>
                    <h4 className='column'>登录</h4>
                    <span onClick={this.toggleForm}>账号注册</span>
                </div>
                <div className="form-content">
                    <Form 
                        name='normal_login'
                        className='login-form'
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item name='username' rules={
                            [
                                { required: true, message: '邮箱不能为空'},
                                { type: 'email', message: '邮箱格式不正确'},
                            ]
                        } >
                            <Input  value={username} onChange={this.inputChangeUsername} prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Username' />
                        </Form.Item>
                        <Form.Item name='password' rules={
                            [
                                { required: true, message: '密码不能为空' },
                               /*  { min: 6, message: '不能小于6位'},
                                { max: 20, message: '不能大于20位'},
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject('error')
                                    }
                                })*/ 
                                { pattern: validate_password, message: '字母+数字，6-20'}
                            ]
                        }>
                            <Input type='password' onChange={this.inputChangePassword} prefix={<UnlockOutlined classID='site-form-item-icon' />} placeholder='Password' />
                        </Form.Item>
                        <Form.Item name='code' rules={
                            [
                                { required: true, message: '验证码不能为空' }
                            ]
                        }>
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Input onChange={this.inputChangeCode} prefix={<UnlockOutlined classID='site-form-item-icon' />} placeholder='Code' />
                                </Col>
                                <Col span={9}>
                                    <Code username={username} module={module}></Code>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary'loading={loading} htmlType='submit' className="login-form-button" block>登录</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

export default LoginForm;