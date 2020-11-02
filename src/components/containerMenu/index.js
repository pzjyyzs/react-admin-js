import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import PrivateRouter from '../privateRouter';
import Components from './components';


class ContainerMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Switch>
                {
                    Components.map(item => {
                        return <PrivateRouter exact key={item.path} path={item.path} component={item.component} />
                    })
                }
               {/*  <PrivateRouter component={UserList} exact path='/index/user/list' ></PrivateRouter>
                <PrivateRouter component={UserAdd} exact path='/index/user/add' ></PrivateRouter>
                <PrivateRouter component={DepartmentList} exact path='/index/department/list' ></PrivateRouter>
                <PrivateRouter component={DepartmentAdd} exact path='/index/department/add' ></PrivateRouter> */}
            </Switch>
        )
    }
}

export default ContainerMenu;