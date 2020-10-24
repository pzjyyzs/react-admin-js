import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Login from './views/Login/index';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route component={Login} exact path='/' />
      </Switch>
    </HashRouter>
  )
}

export default App;
