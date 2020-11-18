import React, { Component } from 'react';
import  { Form, Input, Button, Select, InputNumber, Radio } from 'antd';
const { Option } = Select;
class FormComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentWillReceiveProps({ formConfig }) {
        this.setState({
            
        })
    }

    inputElem = (item) => {
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={item.rules || []}>
                <Input style={item.style} placeholder={item.placeholder}/>
            </Form.Item>
        )
    }

    selectElem = (item) => {
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={item.rules}>
                <Select style={item.style} placeholder={item.placeholder}>
                    {
                        item.options && item.options.map(elem  => {
                            return <Option value={elem.value} key={elem.value}>{elem.label}</Option>
                        })
                    }
                </Select>
            </Form.Item>
        )
    }

    inputNumberElem = (item) => {
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={item.rules}>
                <InputNumber min={item.min} max={item.max} />
            </Form.Item>
        )
    }

    radioElem = (item) => {
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={item.rules}>
                <Radio.Group>
                    {
                        item.options && item.options.map(item => {
                            return <Radio value={item.value} key={item.value}>{item.label}</Radio>
                        })
                    }
                </Radio.Group>
            </Form.Item>
        )
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
            if (item.type === 'InputNumber') {
                formList.push(this.inputNumberElem(item))
            }
            if (item.type === 'Radio') {
                formList.push(this.radioElem(item))
            }
        })

        return formList
    }

    onSubmit = (value) => {
        this.props.onSubmit(value)
    }

    render() {
        return (
            <Form
                ref={this.form}
                {...this.props.formLayout}
                initialValues={{ status: true, number: 0}}
                onFinish={this.onSubmit}
                initialValues={this.props.formConfig.initValue}
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