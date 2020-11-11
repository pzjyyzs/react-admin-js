import { Button, Form, Input, Switch, message } from 'antd';
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {  changeStatus } from '../../api/department'
import TableComponent from './../../components/tableData/index';

class DepartmentList extends Component {
    constructor(props){
        super(props)
        this.state = {
            pageNumber: 1,
            pageSize: 10,
            keyWord: '',
            id: '',
            switchId: '',
            data: [],
            tableConfig: {
                url: 'departmentList',
                method: 'post',
                checkbox: true,
                rowKey:'id',
                thead: [
                    { title: '部门名称', dataIndex: 'name', key: 'name'},
                    { 
                        title: '禁启用', 
                        dataIndex: 'status', 
                        key: 'status', 
                        batchButton: false,
                        render: (text, rowData) => <Switch
                            loading={rowData.id === this.state.switchId}
                            onChange={() => this.onHandlerSwitch(rowData)}
                            checkedChildren='启用' 
                            unCheckedChildren='禁用' 
                            defaultChecked={rowData.status === '1' ? true : false} 
                            />
                    },
                    { title: '人员数量', dataIndex: 'number', key: 'number'},
                    { 
                        title: '操作', 
                        dataIndex: 'operation', 
                        key: 'operation', 
                        width: 215,
                        render: (text, rowData) => {
                            return (
                                <div className='inline-button'>
                                    <Button type='primary' /* onClick={() => this.onHandlerEdit(rowData.id)} */>
                                        <Link to={{pathname: '/index/department/add', state: {id: rowData.id}}}>
                                            编辑
                                        </Link>
                                        </Button>
                                    <Button onClick={() => this.onDelete(rowData.id)}>删除</Button>
                                </div>
                            )
                        }
                    },
                ]
            }
        }
    }

    getChildRef = (ref) => {
        this.tableComponent = ref
    }

    onFinish = (value) => {
        this.setState({
            ...this.state,
            keyWord: value.name,
            pageNumber: 1,
            pageSize: 10
        })
        this.loadData()
    }

    onDelete(id) {
       this.tableComponent.onHandlerDelete(id)
    }


    onHandlerSwitch(data) {
        if (!data.status) return;
        const requestData = {
            id: data.id,
            status: data.status === '1' ? false : true
        }
        this.setState({
            ...this.state,
            switchId: data.id
        })
        changeStatus(requestData).then(response => {
            message.info(response.data.message)
            this.setState({
                ...this.state,
                switchId: ''
            })  
        }).catch(() => {
            this.setState({
                ...this.state,
                switchId: ''
            })
        })
    }

    render() {
        return (
            <Fragment>
                <Form layout='inline' onFinish={this.onFinish}>
                    <Form.Item
                        label='部门名称'
                        name='username'
                        rules={[{required: true, message: '请输入部门名称'}]}
                    >
                        <Input placeholder='请输入部门名称' />
                    </Form.Item>
                    <Form.Item shouldUpdate={true}>
                        <Button type='primary' htmlType='submit'>搜索</Button>
                    </Form.Item>
                </Form>
                <TableComponent onRef={this.getChildRef} config={this.state.tableConfig} /> 
            </Fragment>
        );
    }
}

export default DepartmentList;
