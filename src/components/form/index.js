import React, { Component } from 'react';
import  { Form, Input, Button } from 'antd';
class FormComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    inputElem = (item) => {
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={item.rules || []}>
                <Input />
            </Form.Item>
        )
    }

    selectElem = (item) => {

    }

    initFormItem = () => {
        const { formItem } = this.props
        if(!formItem || (formItem && formItem.length === 0)){ return false;}
        const formList = []
        formItem.map(item => {
            if (item.type === 'Input') {
                formList.push(this.inputElem(item))
            }
            if (item.type === 'Select') {
                formList.push(this.selectElem(item))
            }
        })

        return formList
    }

    onSubmit = (value) => {

    }

    render() {
        return (
            <Form
                ref={this.form}
                {...formLayout}
                initialValues={{ status: true, number: 0}}
                onFinish={this.onSubmit}
            >
                { this.initFormItem() }
                <Form.Item>
                    <Button type='primary' htmlType='submit'>确定</Button>
                </Form.Item>
            </Form>
        )
    }
}

export default FormComponent