import React from 'react';
import { connect } from 'react-redux';

import { selectFile } from '../actions';


const PopulationPage = React.createClass({
  displayName: 'Population',
  getDefaultProps() {
    return {
      title: 'Population'
    };
  },
  componentDidMount: function() {
    const { dispatch } = this.props;
    const selectedFile = this.props.params.filename;
    dispatch( selectFile( selectedFile ) );
  },
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <p>{this.props.selectedFile}</p>
      </div>
    );
  }
});

function mapStateToProps( state ) {
  const selectedFile = state.selectedFile;

  return {
    selectedFile
  };
}

export default connect( mapStateToProps )( PopulationPage );
