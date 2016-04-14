import React, { PropTypes } from 'react';

import TextField from 'material-ui/lib/text-field';
import Slider from 'material-ui/lib/slider';

const max = 9;

export default React.createClass({
  propTypes: {
    count: PropTypes.number.isRequired,
    wealth: PropTypes.number.isRequired,
    onCountChanged: PropTypes.func.isRequired,
    onWealthChanged: PropTypes.func.isRequired
  },
  handleCountSliderChange( e, value ) {
    this.props.onCountChanged( Math.floor( value * max ) );
  },
  handleWealthSliderChange( e, value ) {
    this.props.onWealthChanged( Math.floor( value * max ) );
  },
  render() {
    return (
      <div>
        <div className='col-xs-4'>
          <h5>How Many? {this.props.count + 1}</h5>
          <Slider name='count' defaultValue={this.props.count / max}
            onChange={this.handleCountSliderChange}></Slider>
        </div>
        <div className='col-xs-4'>
          <h5>Wealth {this.props.wealth + 1}</h5>
          <Slider name='wealth' defaultValue={this.props.wealth / max}
            onChange={this.handleWealthSliderChange}></Slider>
        </div>
      </div>
    );
  }
});
