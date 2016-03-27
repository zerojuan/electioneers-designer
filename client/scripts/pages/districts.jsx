import React from 'react';

import { connect } from 'react-redux';

import { selectFile, loadFileIfNeeded } from '../actions';
import { editDistrict, createDistrict, pairDistrict, changeBackground } from '../actions/district';
import { loadGraphics } from '../actions/graphics';

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import DropdownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';

import DistrictsList from '../components/districts/districts-list';
import DistrictsGeographic from '../components/districts/districts-geographic';

import CreateDistrictDialog from '../components/districts/create-district-dialog';
import EditDistrictDialog from '../components/districts/edit-district-dialog';
import EditBackgroundDialog from '../components/edit-background-dialog';

const DistrictsPage = React.createClass({
  displayName: 'Districts',
  getInitialState() {
    return {
      layoutValue: 2,
      createDialogOpen: false,
      changeBackgroundOpen: false,
      editDialogOpen: false,
      selectedDistrict: null
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
    dispatch( loadGraphics() );
  },
  handleLayoutChange( e, index, value ) {
    this.setState({
      layoutValue: value
    });
  },
  handleShowCreateDialog() {
    this.setState({
      createDialogOpen: true
    });
  },
  handleShowEditDialog( district ) {
    this.setState({
      editDialogOpen: true,
      selectedDistrict: district
    });
  },
  handleShowChangeBackground( ) {
    this.setState({
      changeBackgroundOpen: true
    });
  },
  handleHideCreateDialog() {
    this.setState({
      createDialogOpen: false
    });
  },
  handleHideEditDialog() {
    this.setState({
      editDialogOpen: false
    });
  },
  handleHideBackgroundDialog() {
    this.setState({
      changeBackgroundOpen: false
    });
  },
  handleCreateSubmitDialog( district ) {
    const { dispatch } = this.props;

    dispatch( createDistrict( district ) );
  },
  handleEditSubmitDialog( district ) {
    const { dispatch } = this.props;

    dispatch( editDistrict( district ) );
  },
  handleChangeBackgroundDialog( bgId ) {
    const { dispatch } = this.props;

    dispatch( changeBackground( bgId ) );
  },
  handleChangePosition( district ) {
    const { dispatch } = this.props;

    dispatch( editDistrict( district ) );
  },
  handleConnectDistrict( districtA, districtB ) {
    const { dispatch } = this.props;

    dispatch( pairDistrict( districtA, districtB ) );
  },
  render() {
    let view;
    if ( this.state.layoutValue === 1 ) {
      view = <DistrictsList districts={this.props.districts}
        onShowEdit={this.handleShowEditDialog}></DistrictsList>;
    } else {
      view = <DistrictsGeographic
          districts={this.props.districts}
          baseUrl={this.props.baseUrl}
          config={this.props.config}
          graphics={this.props.graphics}
          onChangePosition={this.handleChangePosition}
          onConnectDistrict={this.handleConnectDistrict}></DistrictsGeographic>;
    }

    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <DropdownMenu value={this.state.layoutValue} onChange={this.handleLayoutChange}>
              <MenuItem value={1} primaryText='List'/>
              <MenuItem value={2} primaryText='Geo'/>
            </DropdownMenu>
            <RaisedButton
              label='Create'
              primary={ true }
              onTouchTap={ this.handleShowCreateDialog }>
            </RaisedButton>
            <RaisedButton
              label='Edit Background'
              onTouchTap={ this.handleShowChangeBackground }>
            </RaisedButton>
          </ToolbarGroup>
        </Toolbar>

        {
          view
        }

        <CreateDistrictDialog
          open={this.state.createDialogOpen}
          onClose={this.handleHideCreateDialog}
          onSubmit={this.handleCreateSubmitDialog}/>
        <EditDistrictDialog
          open={this.state.editDialogOpen}
          district={this.state.selectedDistrict}
          districts={this.props.districts}
          onClose={this.handleHideEditDialog}
          onSubmit={this.handleEditSubmitDialog}/>
        <EditBackgroundDialog
          open={this.state.changeBackgroundOpen}
          onClose={this.handleHideBackgroundDialog}
          onSubmit={this.handleChangeBackgroundDialog}
          onChange={this.handleChangeBackgroundDialog}
          backgrounds={this.props.graphics.backgrounds}
          selectedBg={this.props.config.background}
          baseUrl={this.props.baseGraphicsUrl}
          />
      </div>
    );
  }
});

function mapStateToProps( state ) {
  const {
    selectedFile,
    districts,
    config,
    graphics
  } = state;

  const baseUrl = 'http://localhost:7171/image/' + selectedFile;
  const baseGraphicsUrl = 'http://localhost:7171/image/';

  return {
    selectedFile,
    districts,
    baseUrl,
    baseGraphicsUrl,
    config,
    graphics
  };
}

export default connect( mapStateToProps )( DistrictsPage );
