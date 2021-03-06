import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from './views/Login/index';
import Index from './views/index/Index';
import PrivateRouter from './components/privateRouter/index';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Login} exact path='/' />
        <PrivateRouter component={Index} path='/index' />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
