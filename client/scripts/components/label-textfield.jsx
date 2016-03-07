import React from 'react';

import TextField from 'material-ui/lib/text-field';

export default React.createClass({
  render() {
    return (
      <div className='row'>
        <div className='col-xs-2'>
          <h5>{this.props.label}</h5>
        </div>
        <div className='col-xs-8'>
          <TextField value={this.props.value}
            onChange={this.props.onChange}></TextField>
        </div>
      </div>
    );
  }
});
