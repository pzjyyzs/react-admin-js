import { Button, Form, Input, Switch, Table, message, Modal } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getList, deleteItem, changeStatus } from '../../api/department';

class DepartmentList extends Component {
    constructor(props){
        super(props)
        this.state = {
            pageNumber: 1,
            pageSize: 10,
            keyWord: '',
            id: '',
            switchId: '',            
            selectedRowKeys: [],
            visible: false,
            columns: [
                { title: '部门名称', dataIndex: 'name', key: 'name'},
                { 
                    title: '禁启用', 
                    dataIndex: 'status', 
                    key: 'status', 
                    render: (text, rowData) => <Switch
                        loading={rowData.id == this.state.switchId}
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
            ],
            data: []
        }
    }
    
    componentDidMount() {
        this.loadData()
    }

    loadData = () => {
        const requestData = {
            pageNumber: this.state.pageNumber,
            pageSize: this.state.pageSize
        }
        if (this.state.keyWord) {
            requestData.name = this.state.keyWord
        }
        getList(requestData).then(response => {
             const data = response.data.data
             if (data) {
                 this.setState({
                     ...this.state,
                     data: data.data
                 })
             }
        })
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

    onCheckbox = (selectedRowKeys) => {
        this.setState({
            ...this.state,
            selectedRowKeys
        })
    }

    onDelete(id) {
        if (!id) return;
        this.setState({
            ...this.state,
            visible: true,
            id
        })
    }

    hideModal = () => {
        deleteItem({id:this.state.id}).then(response => {
            message.info(response.data.message)
            this.loadData()
            this.setState({
                ...this.state,
                visible: false,
                id: ''
            })
        })
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
        const { columns, data, visible } = this.state
        const rowSelection = {
            onChange: this.onCheckbox
        }
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
                <Table rowSelection={rowSelection} rowKey='id' columns={columns} dataSource={data} bordered></Table>
                <Modal
                    title='系统提示'
                    visible={visible}
                    onOk={this.hideModal}
                    onCancel={() => {this.setState({ ...this.state, visible: false})}}
                    okText='确认'
                    cancelText='取消'
                >
                    <p>确定删除此信息？删除后将无法恢复</p>
                </Modal>
            </Fragment>
        );
    }
}

export default DepartmentList;
