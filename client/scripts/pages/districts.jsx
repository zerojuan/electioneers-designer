import React from 'react';

import { connect } from 'react-redux';

import { selectFile, loadFileIfNeeded } from '../actions';
import { editDistrict, createDistrict } from '../actions/district';

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import DropdownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';

import DistrictsList from '../components/districts-list';
import DistrictsGeographic from '../components/districts-geographic';

import CreateDistrictDialog from '../components/create-district-dialog';
import EditDistrictDialog from '../components/edit-district-dialog';
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
  handleChangeBackgroundDialog( background ) {
    console.log( 'This is the new background: ', background );
  },
  render() {
    let view;
    if ( this.state.layoutValue === 1 ) {
      view = <DistrictsList districts={this.props.districts}
        onShowEdit={this.handleShowEditDialog}></DistrictsList>;
    } else {
      view = <DistrictsGeographic districts={this.props.districts}></DistrictsGeographic>;
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
        <img src='http://localhost:7171/image/glorious-maid/background'/>
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
          />
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
