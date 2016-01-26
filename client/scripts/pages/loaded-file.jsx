import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { selectFile, loadFileIfNeeded } from '../actions';

let LoadedFilePage = React.createClass({
  componentDidMount() {
    const { dispatch } = this.props;
    const selectedFile = this.props.params.filename;
    dispatch( loadFileIfNeeded( selectedFile ) );
    dispatch( selectFile( selectedFile ) );
  },
  render() {
    let saveButton = <b>Save</b>;
    if ( !this.props.isDirty ) {
      saveButton = <b></b>;
    }
    return (
      <div>
        <h1>{ this.props.selectedFile }</h1>
        { saveButton }
        <p>Districts: { this.props.districts.length }</p>
        <p>Population: { this.props.population.length }</p>
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
