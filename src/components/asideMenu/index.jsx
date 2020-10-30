import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu }  from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import Router from '../../router/index'
/* import './aside.scss'; */

class AsideMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedKeys: [],
            openKeys: []
        };    
    }

    componentDidMount() {
        const pathname = this.props.location.pathname
        const menuKey = pathname.split('/').slice(0,3).join('/')
        const muneHeight = {
            selectedKeys: [pathname],
            openKeys: [menuKey]
        }
        this.sleectMenuHigh(muneHeight)
    }

    renderMenu = ({title, key}) => {
        return (
            <Menu.Item key={key}>
                <Link to={key}>{title}</Link>
            </Menu.Item>
        )
    }

    renderSubMenu = ({title, key, children}) => {
        return (
            <SubMenu key={key} title={title}>
                {
                    children && children.map(item => {
                        return  item.children && item.children.length > 0 
                                ? this.renderSubMenu(item) 
                                : this.renderMenu(item) 
                    })
                }
            </SubMenu>
        )
    }

    selectMenu = ({ item, key, keyPath, domEvent }) => {
        const menuHeight = {
            selectedKeys: [key],
            openKeys: [keyPath[keyPath.length - 1]]
        }
        this.sleectMenuHigh(menuHeight)
    }

    sleectMenuHigh = (menuHeight) => {
        this.setState({
            ...this.state,
            ...menuHeight
        })
    }

    openMenu = (openKeys) => {
        this.setState({
            ...this.state,
            openKeys: [openKeys[openKeys.length - 1]]
        })
    }

    render() {
        const { selectedKeys, openKeys } = this.state;
        return (
            <Fragment>
                <h1 className='logo'>
                    <div>LOGO</div>
                </h1>
                <Menu
                    onOpenChange={this.openMenu}
                    onClick={this.selectMenu}
                    theme='dark' 
                    mode='inline' 
                    selectedKeys={selectedKeys} 
                    openKeys={openKeys}
                    style={ { height: '100%', borderRight: 0 } }>
                        { Router && Router.map(firstItem => {
                            return firstItem.children && firstItem.children.length > 0 
                                    ? this.renderSubMenu(firstItem)  
                                    : this.renderMenu(firstItem)
                        })}
                </Menu>
            </Fragment>
        )
    }
} 

export default withRouter(AsideMenu)