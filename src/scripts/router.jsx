import React from 'react/addons';
import Router from 'react-router';
import App from './app';
import Homepage from './pages/home';

window.React = React;

Route = Router.Route;

// var routes = (
//   <Route handler= { App }>
//     <Route name='hello' handler={HomePage} path='/' />
//   </Route>
// );
var routes = <div></div>;

Router.run( routes, ( Handler ) =>
  React.render( <Handler/>, document.getElementById('app') )
)
