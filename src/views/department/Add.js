import React, { Component } from 'react';
import { Form, Input, Button, InputNumber, Radio, message} from 'antd';

import { addDepartment, departmentDetail, departmentEdit } from '../../api/department';
class DepartmentAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formLayout: {
                labelCol: {
                    span: 2
                },
                wrapperCol: {
                    span: 20
                }
            },
            loading: false
        }
        this.form = React.createRef();
    }

    componentWillMount() {
        if (this.props.location.state) {
            this.setState({
                id: this.props.location.state.id
            })
        }
    }

    componentDidMount() {
        console.log(this.props.location.state.name)
        this.getDetail()
    }

    getDetail = () => {
        if (!this.props.location.state) return false;
        const id = this.props.location.state.id;
        departmentDetail({ id }).then(response => {
            this.form.current.setFieldsValue(response.data.data)
        })
    }

    onSubmit = (value) => {

        if(!value.name) {
            message.error('部门名称不能为空')
            return false
        }

        if (!value.number || value.number === 0) {
            message.error('人员数量不能为空')
            return false
        }
        this.setState({
            ...this.state,
            loading: true
        })
      
        this.state.id ? this.onEdit(value) : this.onAdd(value)
    }

    onAdd = (value) => {
        addDepartment(value).then(response => {
            const data = response.data;
            message.info(data.message)
            this.setState({
                ...this.state,
                loading: false
            })
           
            this.form.current.resetFields();
        }).catch(error => {
            message.error(error)
            this.setState({
                ...this.state,
                loading: false
            })
        })
    }

    onEdit = (value) => {
        const requestData = value;
        requestData.id = this.state.id;
        departmentEdit(requestData).then(response => {

        }).catch(error => {
            
        })
    }

    render() {
        const {formLayout, loading} = this.state; 
        return (
            <Form
                ref={this.form}
                {...formLayout}
                initialValues={{ status: true, number: 0}}
                onFinish={this.onSubmit}
            >
                <Form.Item label='部门名称' name='name'>
                   <Input />
                </Form.Item>
                <Form.Item label='人员数量' name='number'>
                    <InputNumber />
                </Form.Item>
                <Form.Item label='禁启用' name='status'>
                    <Radio.Group >
                        <Radio value={true}>启用</Radio>
                        <Radio value={false}>禁用</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label='描述' name='content'>
                    <Input.TextArea />
               </Form.Item>
               <Form.Item>
                   <Button loading={loading} type='primary' htmlType='submit'>确定</Button>
               </Form.Item>
            </Form>
        );
    }
}

export default DepartmentAdd;
