import React, { PropTypes } from 'react';

import TextField from 'material-ui/lib/text-field';
import Slider from 'material-ui/lib/slider';


export default React.createClass({
  propTypes: {
    familyA: PropTypes.object,
    familyB: PropTypes.object,
    onPropChange: PropTypes.func.isRequired
  },
  render() {
    let el = (
      <h>Hello</h>
    );
    if ( this.props.familyA ) {
      el = (
        <h1>{this.props.familyA.fatherName} vs {this.props.familyB.fatherName}</h1>
      )
    }
    return el;
  }
});
