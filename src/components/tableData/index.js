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
            total: 0,
            checkboxValue: [],
            modalVisible: false,
            modalconfirmLoading: false
        }
    }

    componentDidMount() {
        this.loadData()
        this.props.onRef(this)
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

    onCheckbox = (checkboxValue) => {
        this.setState({
            ...this.state,
            checkboxValue
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

    hideModal = () => {
        if (this.state.checkboxValue.length === 0) {
            message.info('请选择需要删除的数据');
            return false;
        }
        this.setState({
            ...this.state,
            confirmLoading: true
        })
        const id = this.state.checkboxValue.join();
        const requestData = {
            url: requestUrl[`${this.props.config.url}Delete`],
            data: {
                id
            }
        }
        tableList(requestData).then(response => {
            message.info(response.data.message)
            this.setState({
                ...this.state,
                modalVisible: false,
                id: '',
                modalconfirmLoading: false,
                selectedRowKeys: []
            })
            this.loadData()
        })
    }

    onHandlerDelete(id) {
       this.setState({ modalVisible: true})
       if (id){ this.setState({ checkboxValue: [id]})}

    }

    render() {
        const { thead, checkbox,rowKey, batchButton } = this.props.config
        const { data, loadingData, total, modalVisible, modalconfirmLoading } = this.state

        const rowSelection = {
            onChange: this.onCheckbox
        }
        return (
            <Fragment>
                <Table pagination={false} loading={loadingData} rowKey={rowKey || 'id'} columns={thead} rowSelection={checkbox ? rowSelection : null} dataSource={data} bordered></Table>
                <Row>
                    <Col span={8}>
                        {batchButton && <Button onClick={() =>{this.onHandlerDelete()}}>批量删除</Button>}
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
                <Modal
                    title='系统提示'
                    visible={modalVisible}
                    onOk={this.hideModal}
                    onCancel={() => {this.setState({ ...this.state, modalVisible: false})}}
                    okText='确认'
                    cancelText='取消'
                    confirmLoading={modalconfirmLoading}
                >
                    <p>确定删除此信息？删除后将无法恢复</p>
                </Modal>
            </Fragment>
        );
    }
}

TableComponent.PropTypes = {
    config: PropTypes.object 
}

export default TableComponent;
