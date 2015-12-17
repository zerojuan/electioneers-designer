import React from 'react';

export default React.createClass({
  displayName: 'Population',
  getDefaultProps() {
    return {
      title: 'Population'
    };
  },
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
      </div>
    )
  }
})
