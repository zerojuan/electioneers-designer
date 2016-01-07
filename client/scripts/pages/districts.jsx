import React from 'react';

import { connect } from 'react-redux';

import { selectFile, loadFileIfNeeded } from '../actions';


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
    dispatch( loadFileIfNeeded( selectedFile ) );
    dispatch( selectFile( selectedFile ) );
  },
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <ul>
          {
            this.props.districts.map( ( district ) => {
              return (
                <li>
                  {district.name}
                </li>
              );
            })
          }
        </ul>
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
