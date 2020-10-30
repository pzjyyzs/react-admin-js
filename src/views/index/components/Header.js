import React, { Component } from 'react';
import { MenuFoldOutlined } from '@ant-design/icons';
import './aside.scss';
class HeaderTitle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: props.collapsed
        }
    }

    changeCollapsed = () => {
        this.props.toggleCollaped()
    }

    render() {
        return (
            <div className='header-wrap'>
                <span className='collapsed-icon' onClick={this.changeCollapsed}><MenuFoldOutlined></MenuFoldOutlined></span>
            </div>
        );
    }
}

export default HeaderTitle;
