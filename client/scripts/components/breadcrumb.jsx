import Breadcrumbs from 'react-breadcrumbs';
import React from 'react';

export default React.createClass({
  render: function() {
    return (
      <div>
        <Breadcrumbs routes={this.props.routes}/>
      </div>
    );
  }
});
