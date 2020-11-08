import React, { Component } from 'react';
import { Button, Form, Input, Switch, Table, message, Modal } from 'antd';
import { getList, deleteItem, changeStatus } from '../../api/department'

class TableComponent extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.loadData()
    }

    loadData = () => {
        const requestData = {
            pageNumber: 1,
            pageSize:10
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

    render() {
        const { columns, rowSelection, rowKey } = this.props
        return (
           <Table columns={columns} rowSelection={rowSelection} rowKey={rowKey} dataSource={data} bordered></Table>
        );
    }
}

export default TableComponent;
