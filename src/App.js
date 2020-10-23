import React from 'react';
import './App.scss';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from './views/Home';
import About from './views/About';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route component={Home} exact path='/'>home</Route>
        <Route component={About} path='/about'>about</Route>
      </Switch>
    </HashRouter>
  )
}

export default App;
