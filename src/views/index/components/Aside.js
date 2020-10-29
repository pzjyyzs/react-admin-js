import React, { Component, Fragment } from 'react';
import { Menu }  from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import './aside.scss';

class Aside extends Component {
    constructor(props){
        super(props);
        this.state = {};    
    }

    render() {
        return (
            <Fragment>
                <h1 className='logo'>
                    <div>LOGO</div>
                </h1>
                <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}
                style={ { height: '100%', borderRight: 0 } }>
                    <SubMenu key='sub1' icon={<UserOutlined />} title='subnav 1'>
                        <Menu.Item key='1'>option1</Menu.Item>
                    </SubMenu>
                    <SubMenu key='sub2' icon={<LaptopOutlined />} title='subnav 2'>
                        <Menu.Item key='2'>option2</Menu.Item>
                    </SubMenu>
                    <SubMenu key='sub3' icon={<NotificationOutlined />} title='subnav 3'>
                        <Menu.Item key='3'>option3</Menu.Item>
                    </SubMenu>
                </Menu>
            </Fragment>
        )
    }
} 

export default Aside