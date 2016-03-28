import React from 'react';

import { connect } from 'react-redux';

import { selectFile, loadFileIfNeeded } from '../actions';
import { loadGraphics } from '../actions/graphics';

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

import BackgroundView from '../components/graphics/background-view';
import DistrictsView from '../components/graphics/districts-view';

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
              <BackgroundView
                backgrounds={this.props.graphics.backgrounds}
                baseUrl={this.props.baseUrl}/>
            </Tab>
            <Tab label='Districts'>
              <DistrictsView
                districts={this.props.graphics.districts}
                baseUrl={this.props.baseUrl}/>
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
       );
    }

  }
});

function mapStateToProps( state ) {
  const graphics = state.graphics;
  const loaded = state.graphicsLoaded;

  const baseUrl = 'http://localhost:7171/image/';

  return {
    graphics,
    loaded,
    baseUrl
  };
}

export default connect( mapStateToProps )( GraphicsPage );
