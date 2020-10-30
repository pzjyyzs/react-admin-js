import React, { Component } from 'react';
import AsideMenu from '../../../components/asideMenu';
import './aside.scss';

class Aside extends Component {
    constructor(props){
        super(props);
        this.state = {};    
    }

    render() {
        return (
           <AsideMenu></AsideMenu>
        )
    }
} 

export default Aside