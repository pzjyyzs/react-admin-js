import React, { Component } from 'react';
import { Layout } from 'antd';

import Aside from './components/Aside';
import './layout.scss';

const { Sider, Header, Content } = Layout;
class Index  extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
           <Layout className='layout-wrap'>
               <Sider width='250px'>
                   <Aside></Aside>
               </Sider>
               <Layout>
                   <Header className='layout-header'></Header>
                   <Content className='layout-main'></Content>
               </Layout>
           </Layout>
        )
    }
}

export default Index;