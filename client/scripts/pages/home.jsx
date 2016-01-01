import React from 'react';
import nanoajax from 'nanoajax';

export default React.createClass({
  displayName: 'HomePage',
  getInitialState() {
    return {
      files: []
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
      that.setState( { files: JSON.parse(responseText) });
    });
  },
  render() {

    return (
      <div>
        <h1>{this.props.title}</h1>
        <div>Count: {this.state.files.length}</div>
        <div>
          <ul>
            {
              this.state.files.map( function( item, i ){
                return (
                  <li key={i}>
                    { item.name }
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }
})
