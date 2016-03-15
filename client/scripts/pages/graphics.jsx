import React from 'react';

import { connect } from 'react-redux';

import { selectFile, loadFileIfNeeded } from '../actions';
import { loadGraphics } from '../actions/graphics';

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

import BackgroundView from '../components/graphics/background-view';

const GraphicsPage = React.createClass({
  displayName: 'GraphicsPage',
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch( loadGraphics() );
  },
  render() {
    if ( this.props.loaded ) {
      return (
        <div>
          <Tabs>
            <Tab label='Backgrounds'>
              <BackgroundView backgrounds={this.props.graphics.backgrounds}/>
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
    } else {
       return (
         <div> Loading... </div>
       )
    }

  }
});

function mapStateToProps( state ) {
  const graphics = state.graphics;
  const loaded = state.graphicsLoaded;

  return {
    graphics,
    loaded
  };
}

export default connect( mapStateToProps )( GraphicsPage );
