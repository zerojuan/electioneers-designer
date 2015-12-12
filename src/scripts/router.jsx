import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';
import App from './app.jsx';
import HomePage from './pages/home.jsx';


render((
  <Router>
    <Route component={App} path='/'>
      <Route path='home' component={HomePage}/>
    </Route>
  </Router>
), document.getElementById('app'));
