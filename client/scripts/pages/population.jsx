import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { selectFile, loadFileIfNeeded } from '../actions';

import { batchGenerateFamily, addFamily, editFamily, pairFamily, deleteFamily } from '../actions/population';

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import DropdownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';

import PopulationList from '../components/population/population-list';
import PopulationGrid from '../components/population/population-grid';
import GenerateFamilyDialog from '../components/population/generate-family-dialog';
import AddFamilyDialog from '../components/population/add-family-dialog';
import EditFamilyDialog from '../components/population/edit-family-dialog';
import PairFamilyDialog from '../components/population/pair-family-dialog';
import DeleteFamilyDialog from '../components/population/delete-family-dialog';

const LIST_VIEW = 1;
const DOTS_VIEW = 2;

const EDIT = 1;
const PAIR = 2;
const DELETE = 3;

const PopulationPage = React.createClass({
  displayName: 'Population',
  getInitialState() {
    return {
      layoutValue: DOTS_VIEW,
      actionValue: EDIT,
      generateDialogOpen: false,
      editFamilyOpen: false,
      pairFamilyOpen: false,
      deleteFamilyOpen: false,
      selectedFamily: null
    };
  },
  getDefaultProps() {
    return {
      title: 'Population'
    };
  },
  propTypes: {
    selectedFile: PropTypes.string.isRequired,
    population: PropTypes.arrayOf( PropTypes.shape({
      _id: PropTypes.string.isRequired,
      fatherName: PropTypes.string.isRequired,
      familyName: PropTypes.string.isRequired
    }).isRequired ).isRequired,
    districts: PropTypes.arrayOf( PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired ).isRequired
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
  handleActionChange( e, index, value ) {
    this.setState({
      actionValue: value,
      selectedFamilyA: null,
      selectedFamilyB: null
    });
  },
  handleShowGenerateDialog( ) {
    this.setState({
      generateDialogOpen: true
    });
  },
  handleHideGenerateDialog( ) {
    this.setState({
      generateDialogOpen: false
    });
  },
  handleGenerateSubmitDialog( data ) {
    // Call the backend with this information
    const { dispatch } = this.props;

    data.districts = this.props.districts;

    dispatch( batchGenerateFamily( data ) );
  },
  handleHideEditFamilyDialog() {
    this.setState({
      editFamilyOpen: false,
      selectedFamily: null
    });
  },
  handleShowEditFamily( family ) {
    this.setState({
      editFamilyOpen: true,
      selectedFamily: family
    });
  },
  handleShowDeleteFamily( family ) {
    this.setState({
      deleteFamilyOpen: true,
      selectedFamily: family
    });
  },
  handleHideDeleteFamilyDialog() {
    this.setState({
      deleteFamilyOpen: false,
      selectedFamily: null
    });
  },
  handleShowPairingDialog( familyA, familyB ) {
    this.setState({
      pairFamilyOpen: true,
      selectedFamilyA: familyA,
      selectedFamilyB: familyB
    });
  },
  handleHidePairingDialog( ) {
    this.setState({
      pairFamilyOpen: false,
      selectedFamilyA: null,
      selectedFamilyB: null
    });
  },
  handleAddFamily( family ) {
    const { dispatch } = this.props;

    dispatch( addFamily( family ) );
  },
  handleEditFamilySubmitDialog( family ) {
    const { dispatch } = this.props;

    dispatch( editFamily( family ) );
  },
  handlePairFamilySubmitDialog( familyA, familyB ) {
    const { dispatch } = this.props;

    dispatch( pairFamily( familyA, familyB ) );
  },
  handleDeleteFamilySubmitDialog( family ) {
    const { dispatch } = this.props;

    dispatch( deleteFamily( family ) );
  },
  handleCellSelected( family ) {
    console.log( 'Family: ', family );
    // note if this is pairing mode
    if ( this.state.actionValue === EDIT ) {
      this.handleShowEditFamily( family );
    } else if ( this.state.actionValue === DELETE ) {
      this.handleShowDeleteFamily( family );
    } else {
      // handle pairing UI
      if ( !this.state.selectedFamilyA ) {
        this.setState({
          selectedFamilyA: family
        });
      } else {

        // if it's the same as before, cancel it
        if ( this.state.selectedFamilyA._id === family._id ) {
          return this.setState({
            selectedFamilyA: null
          });
        }

        // paired, time to show dialog
        this.handleShowPairingDialog( this.state.selectedFamilyA,
          family );
      }
    }
  },
  render() {
    const { layoutValue } = this.state;
    let item = null;

    if ( this.state.layoutValue === LIST_VIEW ) {
      item = <PopulationList
              population={this.props.population}
              onCellSelected={this.handleCellSelected}
              selectedFamilyA={this.state.selectedFamilyA}
              selectedFamilyB={this.state.selectedFamilyB}/>;
    } else {
      item = <PopulationGrid
              population={this.props.population}
              onCellSelected={this.handleCellSelected}
              selectedFamilyA={this.state.selectedFamilyA}
              selectedFamilyB={this.state.selectedFamilyB}/>;
    }


    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text='Layout:'></ToolbarTitle>
            <DropdownMenu value={this.state.layoutValue} onChange={this.handleLayoutChange}>
              <MenuItem value={LIST_VIEW} primaryText='List'/>
              <MenuItem value={DOTS_VIEW} primaryText='Dots'/>
            </DropdownMenu>
            { (this.props.districts.length) ?
              <RaisedButton
                label='Generate Family'
                primary={ true }
                onTouchTap={ this.handleShowGenerateDialog }>
              </RaisedButton>
              :
              <span>Must create a district first</span>
            }

          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarTitle text='Actions:'></ToolbarTitle>
            <DropdownMenu value={this.state.actionValue} onChange={this.handleActionChange}>
              <MenuItem value={1} primaryText='Edit'></MenuItem>
              <MenuItem value={2} primaryText='Pair'></MenuItem>
              <MenuItem value={3} primaryText='Delete'></MenuItem>
            </DropdownMenu>
          </ToolbarGroup>
        </Toolbar>
        <ul>
          { item }
        </ul>
        <GenerateFamilyDialog
          open={this.state.generateDialogOpen}
          onClose={this.handleHideGenerateDialog}
          onSubmit={this.handleGenerateSubmitDialog}/>
        <AddFamilyDialog onSubmit={this.handleEditFamilySubmitDialog}/>
        <EditFamilyDialog
          open={this.state.editFamilyOpen}
          onClose={this.handleHideEditFamilyDialog}
          onSubmit={this.handleEditFamilySubmitDialog}
          family={this.state.selectedFamily}
          population={this.props.population}
          districts={this.props.districts}/>
        <PairFamilyDialog
          open={this.state.pairFamilyOpen}
          onClose={this.handleHidePairingDialog}
          onSubmit={this.handlePairFamilySubmitDialog}
          familyA={this.state.selectedFamilyA}
          familyB={this.state.selectedFamilyB}
          />
        <DeleteFamilyDialog
          open={this.state.deleteFamilyOpen}
          onClose={this.handleHideDeleteFamilyDialog}
          onSubmit={this.handleDeleteFamilySubmitDialog}
          family={this.state.selectedFamily}
          population={this.props.population}
          districts={this.props.districts}
          />
      </div>
    );
  }
});

function mapStateToProps( state ) {
  const {
    selectedFile,
    population,
    districts
  } = state;

  return {
    selectedFile,
    population,
    districts
  };
}

export default connect( mapStateToProps )( PopulationPage );
