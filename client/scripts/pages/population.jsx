import React from 'react';
import { connect } from 'react-redux';

import { selectFile, loadFileIfNeeded } from '../actions';


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
    dispatch( loadFileIfNeeded( selectedFile ) );
    dispatch( selectFile( selectedFile ) );
  },
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <ul>
        {
          this.props.population.map( ( family ) => {
            return (
              <li>
                {family.fatherName + family.familyName}
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
    population
  } = state;

  return {
    selectedFile,
    population
  };
}

export default connect( mapStateToProps )( PopulationPage );
