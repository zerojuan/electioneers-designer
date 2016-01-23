import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { selectFile, loadFileIfNeeded } from '../actions';

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import DropdownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';

import PopulationList from '../components/population-list';
import GenerateFamilyDialog from '../components/generate-family-dialog';

const LIST_VIEW = 1;
const DOTS_VIEW = 2;

const PopulationPage = React.createClass({
  displayName: 'Population',
  getInitialState() {
    return {
      layoutValue: 1,
      generateDialogOpen: false
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
    selectedFile: PropTypes.string.isRequired
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
  render() {
    const { layoutValue } = this.state;
    let item = null;



    if ( this.state.layoutValue === LIST_VIEW ) {
      item = <PopulationList population={this.props.population}></PopulationList>;
    } else {
      item = <h1>Grid View</h1>;
    }


    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <DropdownMenu value={this.state.layoutValue} onChange={this.handleLayoutChange}>
              <MenuItem value={1} primaryText='List'/>
              <MenuItem value={2} primaryText='Dots'/>
            </DropdownMenu>
            <RaisedButton
              label='Generate Family'
              primary={ true }
              onTouchTap={ this.handleShowGenerateDialog }>
            </RaisedButton>
          </ToolbarGroup>
        </Toolbar>
        <ul>
          { item }
        </ul>
        <GenerateFamilyDialog
          open={this.state.generateDialogOpen}
          onClose={this.handleHideGenerateDialog}></GenerateFamilyDialog>
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
