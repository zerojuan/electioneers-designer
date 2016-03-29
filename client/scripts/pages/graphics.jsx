import React from 'react';

import { connect } from 'react-redux';

import { selectFile, loadFileIfNeeded } from '../actions';
import { loadGraphics } from '../actions/graphics';

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

import BackgroundView from '../components/graphics/background-view';
import DistrictsView from '../components/graphics/districts-view';
import AddGraphicsDialog from '../components/graphics/add-graphics-dialog';

const GraphicsPage = React.createClass({
  getInitialState() {
    return {
      addImageDialogOpen: false
    };
  },
  displayName: 'GraphicsPage',
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch( loadGraphics() );
  },
  handleShowUploadFile( page ) {
    this.setState({
      addImageDialogOpen: true
    });
  },
  handleHideUploadFile() {
    this.setState({
      addImageDialogOpen: false
    });
  },
  handleAddImage( data ) {
    console.log( 'Add Image Save...' );
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
                baseUrl={this.props.baseUrl}
                onUploadModal={this.handleShowUploadFile}/>
            </Tab>
            <Tab label='Portraits'>
              <p> Portraits </p>
            </Tab>
            <Tab label='Logos'>
              <p> Logos </p>
            </Tab>
          </Tabs>
          <AddGraphicsDialog
            open={this.state.addImageDialogOpen}
            onClose={this.handleHideUploadFile}
            onSubmit={this.handleAddImage}/>
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
