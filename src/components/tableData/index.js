import React, { Component, Fragment } from 'react';
import { Button, Form, Input, Switch, Table, message, Modal, Pagination, Row, Col } from 'antd';
import { deleteItem, changeStatus } from '../../api/department'
import requestUrl from '../../api/requestUrl';
import { tableList } from './../../api/common';
import PropTypes from 'prop-types';

class TableComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageNumber: 1,
            pageSize: 10,
            keyWork: '',
            data: [],
            loadingData: false,
            total: 0
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
                     data: data.data,
                     total: response.total
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

    onChangeCurrentPage = (value) => {
        this.setState({
            ...this.state,
            pageNumber: value
        }, () => {
            this.loadData()
        })
    }

    onChangeSizePage = (value, page) => {
        this.setState({
            ...this.state,
            pageNumber: 1,
            pageSize: page
        }, () => {
            this.loadData()
        })
    }

    render() {
        const { thead, checkbox,rowKey, batchButton } = this.props.config
        const { data, loadingData, total } = this.state

        const rowSelection = {
            onChange: this.onCheckbox
        }
        return (
            <Fragment>
                <Table pagination={false} loading={loadingData} rowKey={rowKey || 'id'} columns={thead} rowSelection={checkbox ? rowSelection : null} dataSource={data} bordered></Table>
                <Row>
                    <Col span={8}>
                        {batchButton && <Button>批量删除</Button>}
                    </Col>
                    <Col span={16}>
                        <Pagination
                            defaultCurrent={1}
                            onChange={this.onChangeCurrentPage}
                            onShowSizeChange={this.onChangeSizePage}
                            className='pull-right'
                            total={total}
                            showSizeChanger
                            showQuickJumper
                            showTotal={total => `Total ${total} items`}
                        />
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

TableComponent.PropTypes = {
    config: PropTypes.object 
}

export default TableComponent;
