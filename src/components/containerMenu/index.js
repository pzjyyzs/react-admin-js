import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import PrivateRouter from '../privateRouter';
import UserIndex from './../../views/user/index';
import UserAdd from '../../views/user/UserAdd';


class ContainerMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Switch>
                <PrivateRouter component={UserIndex} exact path='/index/user/list' ></PrivateRouter>
                <PrivateRouter component={UserAdd} exact path='/index/user/add' ></PrivateRouter>
            </Switch>
        )
    }
}

export default ContainerMenu;