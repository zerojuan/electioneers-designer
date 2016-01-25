import React from 'react';

import { connect } from 'react-redux';

import { selectFile, loadFileIfNeeded } from '../actions';

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import DropdownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';

import DistrictsList from '../components/districts-list';

const DistrictsPage = React.createClass({
  displayName: 'Districts',
  getInitialState() {
    return {
      layoutValue: 1
    };
  },
  getDefaultProps() {
    return {
      title: 'Districts'
    };
  },
  componentDidMount: function() {
    const { dispatch } = this.props;
    const selectedFile = this.props.params.filename;
    dispatch( loadFileIfNeeded( selectedFile ) );
    dispatch( selectFile( selectedFile ) );
  },
  handleLayoutChange( e, index, value ) {
    this.setState({
      layoutValue: value
    });
  },
  render() {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <DropdownMenu value={this.state.layoutValue} onChange={this.handleLayoutChange}>
              <MenuItem value={1} primaryText='List'/>
              <MenuItem value={2} primaryText='Dots'/>
            </DropdownMenu>
          </ToolbarGroup>
        </Toolbar>
        <DistrictsList districts={this.props.districts}></DistrictsList>
      </div>
    );
  }
});

function mapStateToProps( state ) {
  const {
    selectedFile,
    districts
  } = state;

  return {
    selectedFile,
    districts
  };
}

export default connect( mapStateToProps )( DistrictsPage );
