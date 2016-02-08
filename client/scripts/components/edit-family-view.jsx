import React, { PropTypes } from 'react';

import TextField from 'material-ui/lib/text-field';
import Slider from 'material-ui/lib/slider';

const LabelTextField = React.createClass({
  render(){
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
    )
  }
});

export default React.createClass({
  propTypes: {
    family: PropTypes.object,
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
        <LabelTextField
          label="Father's name"
          value={this.props.family.fatherName}
          onChange={this.handlePropChange( 'fatherName' )}
          />
        <LabelTextField
          label="Family Name"
          value={this.props.family.familyName}
          onChange={this.handlePropChange( 'familyName' )}
          />
      </div>
    );
  }
});
