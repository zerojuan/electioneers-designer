import React from 'react';

console.log( 'I Am Rendering' );

export default React.createClass({
  displayName: 'HomePage',
  getDefaultProps() {
    return {
      title: 'Home Page'
    };
  },
  render() {
    return (
      <div>
        <h1>What is wrong here</h1>
      </div>
    )
  }
})
