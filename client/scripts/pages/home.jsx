import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchFilesIfNeeded } from '../actions';

import SavedFilesCard from '../components/saved-files-card.jsx';

let Home = React.createClass({
  displayName: 'HomePage',
  propTypes: {
    isFetching: PropTypes.bool.isRequired,
    didInvalidate: PropTypes.bool.isRequired,
    files: PropTypes.arrayOf( PropTypes.shape({
      name: PropTypes.string.isRequired,
      lastModified: PropTypes.string.isRequired
    }).isRequired).isRequired
  },
  getDefaultProps() {
    return {
      title: 'Home Page'
    };
  },
  componentDidMount: function(){
    const { dispatch } = this.props
    dispatch(fetchFilesIfNeeded());
    // const that = this;
    // nanoajax.ajax({url:'http://localhost:7171/'}, function (code, responseText) {
    //   that.setState( { files: JSON.parse(responseText) });
    // });
  },
  render() {
    let { files } = this.props;
    console.log( 'Files: ', files );
    return (
      <div>
        <h1>{this.props.title}</h1>
        <div>Count: {this.props.files.length}</div>
        <SavedFilesCard files={this.props.files} />
      </div>
    )
  }
})

function mapStateToProps( state ) {
  console.log( 'State: ', state );
  const {
    isFetching,
    didInvalidate,
    items: files
  } = state.savedFiles || {
    isFetching: false,
    didInvalidate: false,
    items: []
  };

  return {
    files,
    didInvalidate,
    isFetching
  }
}

export default connect( mapStateToProps )( Home );
