import React, { PropTypes } from 'react';

import { findDOMNode } from 'react-dom';
import LoggerMixin from 'react-logger';

import DropdownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';

import CanvasGeoView from '../canvas/canvas-geoview';

const style = {
  overflow: 'scroll'
};

export default React.createClass({
  propTypes: {
    districts:        PropTypes.array,
    baseUrl:          PropTypes.string.isRequired,
    config:           PropTypes.object,
    onChangePosition: PropTypes.func.isRequired
  },
  mixins: [ LoggerMixin ],
  componentDidMount() {
    const el = findDOMNode( this );
    this.canvas = new CanvasGeoView(
      el,
      this.props.baseUrl,
      {
        onDistrictsUpdate: this.handleDistrictsUpdate,
        onDistrictsConnect: this.handleDistrictsConnect
      });

    this.canvas.create( el, {
      width: '100%',
      height: '400px',
      districts: this.props.districts,
      config: this.props.config,
      graphics: this.props.graphics
    });
  },
  componentDidUpdate() {
    this.log( 'Updating canvas...' );
    const el = findDOMNode( this );

    this.canvas.update( el,  {
      districts: this.props.districts,
      baseUrl: this.props.baseUrl,
      config: this.props.config,
      graphics: this.props.graphics
    });
  },
  handleDistrictsUpdate( district ) {
    this.props.onChangePosition( district );
  },
  handleDistrictsConnect( districtA, districtB ) {
    this.props.onConnectDistrict( districtA, districtB );
  },
  render() {
    return (
      <div></div>
    );
  }
});
