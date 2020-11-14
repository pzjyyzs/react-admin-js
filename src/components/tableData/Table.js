import React, { Component, Fragment } from 'react';

import { Table,Row,Col,Pagination, Button } from 'antd';
import { PropTypes } from 'prop-types';
class TableBasis extends Component {
    render() {
        const { columns, dataSource, total, changePageCurrent, changePageSize, batchButton, handlerDelete, rowSelection,rowKey } = this.props;
        return (
            <Fragment>
                <Table 
                    pagination={false} 
                    columns={columns} 
                    dataSource={dataSource}
                    rowSelection={rowSelection}
                    rowKey={rowKey}
                    bordered
                ></Table>
                <Row>
                    <Col span={8}>
                        {batchButton && <Button onClick={handlerDelete}>批量删除</Button>}
                    </Col>
                    <Col span={16}>
                        <Pagination
                            defaultCurrent={1}
                            onChange={changePageCurrent}
                            onShowSizeChange={changePageSize}
                            className='pull-right'
                            total={total}
                            showSizeChanger
                            showQuickJumper
                            showTotal={total => `Total ${total} items`}
                        />
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

TableBasis.propTypes = {
    columns: PropTypes.array,
    dataSource: PropTypes.array,
    total: PropTypes.number,
    changePageCurrent: PropTypes.func,
    changePageSize: PropTypes.func,
    batchButton: PropTypes.bool,
    rowSelection: PropTypes.object,
    rowKey: PropTypes.string
}

TableBasis.defaultProp = {
    columns: [],
    dataSource: [],
    total: 0,
    batchButton: true,
    rowKey: 'id'
}
export default TableBasis;