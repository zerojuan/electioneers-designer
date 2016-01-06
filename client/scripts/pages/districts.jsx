import React from 'react';

import { connect } from 'react-redux';

import { selectFile } from '../actions';


const DistrictsPage = React.createClass({
  displayName: 'Districts',
  getDefaultProps() {
    return {
      title: 'Districts'
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

export default connect( mapStateToProps )( DistrictsPage );
