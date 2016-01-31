import promise from 'es6-promise';
promise.polyfill();

import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';


import App from './app.jsx';
import designerApp from './reducers';
import HomePage from './pages/home.jsx';
import PopulationPage from './pages/population.jsx';
import DistrictsPage from './pages/districts.jsx';
import FormulasPage from './pages/formulas.jsx';
import LoadedFilePage from './pages/loaded-file.jsx';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const logger = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  logger
)( createStore );

let store = createStoreWithMiddleware( designerApp );

render( (
  <Provider store={store}>
    <Router>
      <Route component={App} path='/' name='Designer'>
        <IndexRoute component={HomePage} name='Home'/>
        <Route path=':filename/population' component={PopulationPage} name='Population'/>
        <Route path=':filename/districts' component={DistrictsPage} name='Districts' />
        <Route path=':filename/formulas' component={FormulasPage} name='Formulas' />
        <Route path=':filename/' component={LoadedFilePage} name='LoadedFile'/>
      </Route>
    </Router>
  </Provider>
), document.getElementById( 'app' ) );
