import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';


import App from './app.jsx';
import designerApp from './reducers';
import HomePage from './pages/home.jsx';
import PopulationPage from './pages/population.jsx';
import DistrictsPage from './pages/districts.jsx';
import FormulasPage from './pages/formulas.jsx';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

let store = createStore( designerApp );

render((
  <Provider store={store}>
    <Router>
      <Route component={App} path='/' name='Designer'>
        <IndexRoute component={HomePage} name='Home'/>
        <Route path='population' component={PopulationPage} name='Population'/>
        <Route path='districts' component={DistrictsPage} name='Districts' />
        <Route path='formulas' component={FormulasPage} name='Formulas' />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
