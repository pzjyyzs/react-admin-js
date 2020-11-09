import React, { Component } from 'react';
import { Button, Form, Input, Switch, Table, message, Modal } from 'antd';
import { deleteItem, changeStatus } from '../../api/department'
import requestUrl from '../../api/requestUrl';
import { tableList } from './../../api/common';

class TableComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageNumber: 1,
            pageSize: 10,
            keyWork: '',
            data: [],
            loadingData: false
        }
    }

    componentDidMount() {
        this.loadData()
    }

    loadData = () => {
        const { pageNumber, pageSize } =  this.state
        const requestData = {
            url:  requestUrl[this.props.config.url],
            method: this.props.config.method,
            data: {
                pageNumber: pageNumber,
                pageSize: pageSize
            }
        }
        this.setState({
            ...this.state,
            loadingData: true
        })
        tableList(requestData).then(response => {
             const data = response.data.data
             if (data) {
                 this.setState({
                     ...this.state,
                     data: data.data
                 })
             }
             this.setState({
                 ...this.state,
                 loadingData: false
             })
        }).catch(() => {
            this.setState({
                ...this.state,
                loadingData: false
            })
        })
    }

    onCheckbox = (selectedRowKeys) => {
        this.setState({
            ...this.state,
            selectedRowKeys
        })
    }

    render() {
        const { thead, checkbox,rowKey } = this.props.config
        const { data, loadingData } = this.state

        const rowSelection = {
            onChange: this.onCheckbox
        }
        return (
           <Table loading={loadingData} rowKey={rowKey || 'id'} columns={thead} rowSelection={checkbox ? rowSelection : null} dataSource={data} bordered></Table>
        );
    }
}

export default TableComponent;
