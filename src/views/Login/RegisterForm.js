import React, { Component } from 'react';
import { Form, Input,Button, Row, Col } from 'antd';
import Code from '../../components/code/index';
import { Register } from  '../../api/account';
import { UserOutlined, UnlockOutlined }  from '@ant-design/icons';
class RegisterForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            code: '',
            module: 'register'
        }
    }

    onFinish = values => {
        const requestData = {
            username: this.state.username,
            password: this.state.password,
            code: this.state.code
        }
        Register(requestData).then(data => {

        }).catch(() => {

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
        this.props.switchForm('login')
    }
    render() {
        const { username, module } = this.state;
        return (
            <div>
                <div className='form-header'>
                    <h4 className='column'>注册</h4>
                    <span  onClick={this.toggleForm}>登录</span>
                </div>
                <div className="form-content">
                    <Form 
                        name='normal_login'
                        className='login-form'
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item name='username' rules={[
                            { required: true, message: '邮箱不能为空!'}
                        ]} >
                            <Input value={username} onChange={this.inputChangeUsername} prefix={<UserOutlined className='site-form-item-icon' />} placeholder='请输入邮箱' />
                        </Form.Item>
                        <Form.Item name='password' rules={[
                            { required: true, message: '密码不能为空' },
                            ({ getFieldValue }) => ({
                                validator(role, value) {
                                    let passwordValue = getFieldValue('passwords')
                                    if (passwordValue && value !==passwordValue) {
                                        return Promise.reject('两次密码不一致')
                                    }
                                    return Promise.resolve()
                                }
                            })
                        ]}>
                            <Input type='password' onChange={this.inputChangePassword} prefix={<UnlockOutlined classID='site-form-item-icon' />} placeholder='请输入密码' />
                        </Form.Item>
                        <Form.Item name='passwords' rules={[
                            { required: true, message: '两次密码不一致' },
                            ({ getFieldValue }) => ({
                                validator(role, value){
                                    if (value !==getFieldValue('password')) {
                                        return Promise.reject('两次密码不一致')
                                    }
                                    return Promise.resolve()
                                }
                            })
                        ]}>
                            <Input type='password' prefix={<UnlockOutlined classID='site-form-item-icon' />} placeholder='请确认密码' />
                        </Form.Item>
                        <Form.Item name='code' rules={[
                            { required: true, message: '请输入验证码' }
                        ]}>
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Input  onChange={this.inputChangeCode} prefix={<UnlockOutlined classID='site-form-item-icon' />} placeholder='Code' />
                                </Col>
                                <Col span={9}>
                                    <Code username={username} module={module}></Code>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType='submit' className="login-form-button" block>注册</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

export default RegisterForm;