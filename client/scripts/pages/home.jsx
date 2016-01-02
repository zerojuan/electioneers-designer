import React from 'react';
import nanoajax from 'nanoajax';

import SavedFilesCard from '../components/saved-files-card.jsx';

export default React.createClass({
  displayName: 'HomePage',
  getInitialState() {
    return {
      files: []
    }
  },
  getDefaultProps() {
    return {
      title: 'Home Page'
    };
  },
  componentDidMount: function(){
    const that = this;
    nanoajax.ajax({url:'http://localhost:7171/'}, function (code, responseText) {
      that.setState( { files: JSON.parse(responseText) });
    });
  },
  render() {

    return (
      <div>
        <h1>{this.props.title}</h1>
        <div>Count: {this.state.files.length}</div>
        <SavedFilesCard files={this.state.files} />
      </div>
    )
  }
})
