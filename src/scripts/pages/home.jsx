import React from 'react';
import nanoajax from 'nanoajax';

export default React.createClass({
  displayName: 'HomePage',
  getInitialState() {
    return {
      greeting: 'Nothing'
    }
  },
  getDefaultProps() {
    return {
      title: 'Home Page'
    };
  },
  componentDidMount: function(){
    const that = this;
    nanoajax.ajax({url:'http://localhost:7171/'}, function (code, responseText) {
      that.setState( { greeting: responseText });
    });
  },
  render() {
    return (
      <div>
        <h1>{this.state.greeting}</h1>
        <div>Put your objects here</div>
      </div>
    )
  }
})
