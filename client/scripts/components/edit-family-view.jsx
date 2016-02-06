import React, { PropTypes } from 'react';

import TextField from 'material-ui/lib/text-field';
import Slider from 'material-ui/lib/slider';

export default React.createClass({
  mixins: [LinkedStateMixin],
  propTypes: {
    family: PropTypes.object.isRequired,
    onPropChange: PropTypes.func.isRequired
  },
  handlePropChange( propName ) {
    return ( event ) => {
      this.props.onPropChange( propName, event.target.value );
    }
  },
  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-xs-2'>
            <h5>Father's Name: </h5>
          </div>
          <div className='col-xs-8'>
            <TextField value={this.props.family.fatherName}
              onChange={this.handlePropChange( 'fatherName' )}></TextField>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-2'>
            <h5>Family Name: </h5>
          </div>
          <div className='col-xs-8'>
            <TextField value={this.props.family.familyName}
              onChange={this.handlePropChange( 'familyName' )}></TextField>
          </div>
        </div>
      </div>
    );
  }
});
