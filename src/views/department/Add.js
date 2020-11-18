import React, { Component, Fragment } from 'react';
import { Form, Input, Button, InputNumber, Radio, message} from 'antd';

import { addDepartment, departmentDetail, departmentEdit } from '../../api/department';
import FormComponent from './../../components/form/index';
class DepartmentAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formConfig: {
                initValue: {
                    number: 0,
                    statue: true
                }
            },
            formLayout: {
                labelCol: {
                    span: 2
                },
                wrapperCol: {
                    span: 20
                }
            },
            loading: false,
            formItem: [
                { type: 'Input', label: '部门名称',name: 'name', rules: [
                    { required: true, message: '部门名称不能为空'}
                ] },
                {
                    type: 'Select',
                    label:'select',
                    name: 'select',
                    rules: [
                        { required: true, }
                    ],
                    options: [
                        { label: 'yanfabu', value: 'a'}
                    ],
                    placeholder: 'select'
                },
                {
                    type: 'InputNumber',
                    label: 'number',
                    name: 'number',
                    rules: [
                        { required: true }
                    ],
                    style: { width: '200px'},
                    placeholder: 'number',
                    max: 100,
                    min: 0
                },
                {
                    type: 'Radio',
                    label: '禁启用',
                    name: 'statue',
                    rules: [
                        { required: true }
                    ],
                    options: [
                        { label: 'stop', value: false },
                        { label: 'start', value: true },
                    ]
                }
            ]
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
        this.getDetail()
    }

    getDetail = () => {
        if (!this.props.location.state) return false;
        const id = this.props.location.state.id;
        departmentDetail({ id }).then(response => {
            this.setState({
                ...this.state,
                formConfig: {
                    ...this.state.formConfig,
                    initValue: response.data.data
                }
            })
            //this.form.current.setFieldsValue(response.data.data)
        })
    }

    onSubmit = (value) => {
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
            const data = response.data;
            message.info(data.message)
            this.setState({
                ...this.state,
                loading: false
            })
        }).catch(error => {
            this.setState({
                ...this.state,
                loading: false
            })
        })
    }

    render() {
        const {formLayout, loading, formItem, formConfig} = this.state; 
        return (
            <Fragment>
                <FormComponent formItem={formItem} formLayout={formLayout} onSubmit={this.onSubmit} formConfig={formConfig}></FormComponent>
            </Fragment>
        );
    }
}

export default DepartmentAdd;
