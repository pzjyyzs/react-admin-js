import React, { Component } from 'react';
import { Layout } from 'antd';

import Aside from './components/Aside';
import './layout.scss';
import ContainerMenu from '../../components/containerMenu';
import HeaderTitle from './components/Header';

const { Sider, Header, Content } = Layout;
class Index  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        }
    }

    componentDidMount() {
        const collapsed = JSON.parse(sessionStorage.getItem('collapsed'))
        this.setState({
            collapsed
        })
    }

    toggleCollaped = () => {
        const collapsed = !this.state.collapsed;
        this.setState({
            collapsed
        })
        sessionStorage.setItem('collapsed',collapsed)
    }
    render() {
        return (
           <Layout className='layout-wrap'>
               <Sider collapsed={this.state.collapsed} width='250px'>
                   <Aside></Aside>
               </Sider>
               <Layout>
                   <Header className='layout-header'>
                       <HeaderTitle collapsed={this.state.collapsed} toggleCollaped={this.toggleCollaped}></HeaderTitle>
                   </Header>
                   <Content className='layout-main'>
                       <ContainerMenu></ContainerMenu>
                   </Content>
               </Layout>
           </Layout>
        )
    }
}

export default Index;