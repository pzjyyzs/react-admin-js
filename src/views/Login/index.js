import React, { Component } from 'react';
import LoginForm from './LoginForm';

import './index.scss';
import RegisterForm from './RegisterForm';
class Login extends Component {
    constructor() {
        super();
        this.state = {
            fromType: 'login'
        }
    }

    switchForm = (value) => {
        this.setState({
            ...this.state,
            fromType: value
        })
    }

    render() {
        return (
        <div className='form-wrap'>
            {
                this.state.fromType === 'login' 
                    ? <LoginForm switchForm={this.switchForm}></LoginForm> 
                    : <RegisterForm switchForm={this.switchForm}></RegisterForm>
            }
        </div>
        )
    }
}

export default Login