import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router';

import { selectFile, loadFileIfNeeded, saveFile } from '../actions';

import FlatButton from 'material-ui/lib/flat-button';

let LoadedFilePage = React.createClass({
  componentDidMount() {
    const { dispatch } = this.props;
    const selectedFile = this.props.params.filename;
    dispatch( loadFileIfNeeded( selectedFile ) );
    dispatch( selectFile( selectedFile ) );
  },
  handleFileSave() {
    const { dispatch } = this.props;
    dispatch( saveFile( this.props.selectedFile ) );
  },
  render() {
    let saveButton = <FlatButton label='Save' onTouchTap={this.handleFileSave}></FlatButton>;
    if ( !this.props.isDirty ) {
      saveButton = <b></b>;
    }
    return (
      <div>
        <h1>{ this.props.selectedFile }</h1>
        { saveButton }
        <p>
          <Link to={this.props.selectedFile + '/districts' }>
            Districts: { this.props.districts.length }
          </Link>
        </p>
        <p>
          <Link to={this.props.selectedFile + '/population' }>
            Population: { this.props.population.length }
          </Link>
        </p>
      </div>
    );
  }
});

function mapStateToProps( state ) {
  const {
    selectedFile,
    districts,
    population,
    isDirty } = state;

  return {
    selectedFile,
    districts,
    population,
    isDirty
  };
}

export default connect( mapStateToProps )( LoadedFilePage );
