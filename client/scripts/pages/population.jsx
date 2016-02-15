import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { selectFile, loadFileIfNeeded } from '../actions';

import { batchGenerateFamily, editFamily, pairFamily } from '../actions/population';

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import DropdownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';

import PopulationList from '../components/population-list';
import PopulationGrid from '../components/population-grid';
import GenerateFamilyDialog from '../components/generate-family-dialog';
import EditFamilyDialog from '../components/edit-family-dialog';
import PairFamilyDialog from '../components/pair-family-dialog';

const LIST_VIEW = 1;
const DOTS_VIEW = 2;

const EDIT = 1;
const PAIR = 2;

const PopulationPage = React.createClass({
  displayName: 'Population',
  getInitialState() {
    return {
      layoutValue: DOTS_VIEW,
      actionValue: EDIT,
      generateDialogOpen: false,
      editFamilyOpen: false,
      pairFamilyOpen: false,
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
    })
  },
  handleEditFamilySubmitDialog( family ) {
    const { dispatch } = this.props;

    dispatch( editFamily( family ) );
  },
  handlePairFamilySubmitDialog( familyA, familyB ) {
    const { dispatch } = this.props;

    dispatch( pairFamily( familyA, familyB ) );
  },
  handleCellSelected( family ) {
    console.log( 'Family: ', family );
    // note if this is pairing mode
    if ( this.state.actionValue === EDIT ) {
      this.handleShowEditFamily( family );
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
            <RaisedButton
              label='Generate Family'
              primary={ true }
              onTouchTap={ this.handleShowGenerateDialog }>
            </RaisedButton>
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarTitle text='Actions:'></ToolbarTitle>
            <DropdownMenu value={this.state.actionValue} onChange={this.handleActionChange}>
              <MenuItem value={1} primaryText='Edit'></MenuItem>
              <MenuItem value={2} primaryText='Pair'></MenuItem>
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
        <EditFamilyDialog
          open={this.state.editFamilyOpen}
          onClose={this.handleHideEditFamilyDialog}
          onSubmit={this.handleEditFamilySubmitDialog}
          family={this.state.selectedFamily}
          population={this.props.population}/>
        <PairFamilyDialog
          open={this.state.pairFamilyOpen}
          onClose={this.handleHidePairingDialog}
          onSubmit={this.handlePairFamilySubmitDialog}
          familyA={this.state.selectedFamilyA}
          familyB={this.state.selectedFamilyB}
          />
      </div>
    );
  }
});

function mapStateToProps( state ) {
  const {
    selectedFile,
    population
  } = state;

  return {
    selectedFile,
    population
  };
}

export default connect( mapStateToProps )( PopulationPage );
