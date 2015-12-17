import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';
import App from './app.jsx';
import HomePage from './pages/home.jsx';
import PopulationPage from './pages/population.jsx';

render((
  <Router>
    <Route component={App} path='/' name='Designer'>
      <Route path='home' component={HomePage} name='Home'/>
      <Route path='population' component={PopulationPage} name='Population'/>
    </Route>
  </Router>
), document.getElementById('app'));
