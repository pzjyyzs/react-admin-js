import React, { Component } from 'react';
import { Form, Input,Button, Row, Col, message } from 'antd';
import { UserOutlined, UnlockOutlined }  from '@ant-design/icons';
import { validate_password } from '../../utils/validate';
import { Login, GetCode } from '../../api/account';
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            codeButtonLoading: false,
            codeButtonText: '获取验证码'
        }
    }

    onFinish = values => {
        Login().then(response => {
           
        }).catch(error => {
           
        })
    }

    getCode = () => {
        
        if (!this.state.username) {
            message.warning('用户名不能为空');
            return false;
        }
        this.setState({
            ...this.state,
            codeButtonLoading: true,
            codeButtonText: '发送中'
        })
        const requestData = {
            username: this.state.username,
            module: "login"
        }
        GetCode(requestData).then(response => {

        }).catch(error => {
            this.setState({
                ...this.state,
                codeButtonLoading: false,
                codeButtonText: '重新获取'
            })
        })
    }

    inputChange = (e) => {
        let value = e.target.value;
        this.setState({
            username: value
        })
    }

    toggleForm = () => {
        this.props.switchForm('rester');
    }
    render() {
        const { username, codeButtonLoading, codeButtonText } = this.state;
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
                            <Input  value={username} onChange={this.inputChange} prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Username' />
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
                            <Input prefix={<UnlockOutlined classID='site-form-item-icon' />} placeholder='Password' />
                        </Form.Item>
                        <Form.Item name='code' rules={
                            [
                                { required: true, message: '验证码不能为空' }
                            ]
                        }>
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Input prefix={<UnlockOutlined classID='site-form-item-icon' />} placeholder='Code' />
                                </Col>
                                <Col span={9}>
                                    <Button type='danger'loading={codeButtonLoading} htmlType='submit' className="login-form-button" block onClick={this.getCode}>{codeButtonText}</Button>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType='submit' className="login-form-button" block>登录</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

export default LoginForm;