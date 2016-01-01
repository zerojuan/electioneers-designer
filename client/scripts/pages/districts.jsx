import React from 'react';

export default React.createClass({
  displayName: 'Districts',
  getDefaultProps() {
    return {
      title: 'Districts'
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
