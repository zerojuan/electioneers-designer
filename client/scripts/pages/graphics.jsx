import React from 'react';

import { connect } from 'react-redux';

import { selectFile, loadFileIfNeeded } from '../actions';

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

import BackgroundView from '../components/graphics/background-view';

const GraphicsPage = React.createClass({
  displayName: 'GraphicsPage',
  render() {
    return (
      <div>
        <Tabs>
          <Tab label='Backgrounds'>
            <BackgroundView />
          </Tab>
          <Tab label='Districts'>
            <p> Districts </p>
          </Tab>
          <Tab label='Portraits'>
            <p> Portraits </p>
          </Tab>
          <Tab label='Logos'>
            <p> Logos </p>
          </Tab>
        </Tabs>
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

export default connect( mapStateToProps )( GraphicsPage );
