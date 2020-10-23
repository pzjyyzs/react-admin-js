import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from './views/Home';
import About from './views/About';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route component={Home} exact path='/' />
        <Route component={About} path='/about' />
      </Switch>
    </HashRouter>
  )
}

export default App;
