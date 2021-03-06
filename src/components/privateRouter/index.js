import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getToken } from '../../utils/cookies';

const PrivateRouter = ({ component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={routeProps => (
               getToken('adminToken') ?  <Component {...routeProps} /> : <Redirect to='/' />
            )}
        />
    )
}

export default PrivateRouter;