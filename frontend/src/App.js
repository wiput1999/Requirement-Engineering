import React from 'react';
import { Route, Router } from 'react-router-dom'

import './App.css';
import Index from './pages/Index'
import history from './utils/history'


function App() {
  return (
    <Router history={history}>
      <Route path="/" component={Index} />
    </Router>
  );
}

export default App;
