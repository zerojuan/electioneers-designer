import React from 'react';

export default React.createClass({
  displayName: 'Formulas',
  getDefaultProps() {
    return {
      title: 'Formulas'
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
