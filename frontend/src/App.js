import React from 'react';
import { Route, Router } from 'react-router-dom'

import './App.css';
import TopMenu from './common/TopMenu'
import Home from './pages/Home'
import history from './utils/history'


function App() {
  return (
    <Router history={history}>
      <TopMenu />
      <Route path="/" exact={true} component={Home} />
    </Router>
  );
}

export default App;
