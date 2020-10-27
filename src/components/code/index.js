import React, { Component } from 'react';
import { Button, message } from 'antd';
import { GetCode } from '../../api/account';

let timer = null;
class Code extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            codeButtonLoading: false,
            codeButtonDisabled: false,
            codeButtonText: "获取验证码"
        }
    };

    componentWillReceiveProps({username}) {
        this.setState({
            ...this.state,
            username
        })
    }

    componentWillUnmount() {
        clearInterval(timer)
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
            this.countDown();
        }).catch(error => {
            this.setState({
                ...this.state,
                codeButtonLoading: false,
                codeButtonText: '重新获取'
            })
        })
    }

    countDown = () => {
        let sec = 60;
        this.setState({
            ...this.state,
            codeButtonLoading: false,
            codeButtonDisabled: true,
            codeButtonText: `${sec}s`
        })

        timer = setInterval(() => {
            sec--;
            if (sec <=0) {
                this.setState({
                    ...this.state,
                    codeButtonText:'重新获取',
                    codeButtonDisabled: false
                })
                clearInterval(timer)
                return false
            }
            this.setState({
                ...this.state,
                codeButtonText:`${sec}s`
            })
        }, 1000)
    }

    render() {
        const { codeButtonText, codeButtonLoading,codeButtonDisabled  } = this.state;
        return  <Button type='danger' disabled={codeButtonDisabled} loading={codeButtonLoading} htmlType='submit' className="login-form-button" block onClick={this.getCode}>{codeButtonText}</Button>
    }
}

export default Code