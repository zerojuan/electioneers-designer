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
    return (
      <div>
        <h1>{ this.props.selectedFile }</h1>
        <p>{ this.props.districts.length }</p>
        <p>{ this.props.population.length }</p>
      </div>
    );
  }
});

function mapStateToProps( state ) {
  const {
    selectedFile,
    districts,
    population } = state;

  return {
    selectedFile,
    districts,
    population
  };
}

export default connect( mapStateToProps )( LoadedFilePage );
