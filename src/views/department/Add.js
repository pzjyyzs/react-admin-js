import React, { Component } from 'react';
import { Form, Input, Button, InputNumber, Radio, message} from 'antd';

import { addDepartment } from '../../api/department';
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
            }
        }
    }

    onSubmit = (value) => {
        addDepartment(value).then(response => {
            const data = response.data;
            message.info(data.message)
        }).catch(error => {

        })
    }

    render() {
        const {formLayout} = this.state; 
        return (
            <Form 
                {...formLayout}
                onFinish={this.onSubmit}
            >
                <Form.Item label='部门名称' name='name'>
                   <Input />
                </Form.Item>
                <Form.Item label='人员数量' name='number'>
                    <InputNumber defaultValue={0} />
                </Form.Item>
                <Form.Item label='禁启用' name='status'>
                    <Radio.Group defaultValue={true}>
                        <Radio value={true}>启用</Radio>
                        <Radio value={false}>禁用</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label='描述' name='content'>
                    <Input.TextArea />
               </Form.Item>
               <Form.Item>
                   <Button type='primary' htmlType='submit'>确定</Button>
               </Form.Item>
            </Form>
        );
    }
}

export default DepartmentAdd;
