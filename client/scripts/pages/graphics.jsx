import React from 'react';

import { connect } from 'react-redux';

import { selectFile, loadFileIfNeeded } from '../actions';
import { loadGraphics, uploadGraphics, deleteGraphics } from '../actions/graphics';

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
  componentWillReceiveProps( nextProp ) {
    if ( nextProp.loaded ) {
      this.setState({
        addImageDialogOpen: false
      });
    }
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
    console.log( 'Add Image Save...', data );
    const { dispatch } = this.props;
    // TODO: have types for different uploads
    data.type = 'districts';
    dispatch( uploadGraphics( data ) );
  },
  handleDeleteImage( type, data ) {
    const { dispatch } = this.props;
    dispatch( deleteGraphics( type, data ) );
  },
  render() {
    if ( this.props.loaded ) {
      return (
        <div>
          <Tabs>
            <Tab label='Backgrounds'>
              <BackgroundView
                backgrounds={this.props.graphics.backgrounds}
                baseUrl={this.props.baseUrl}
                onUploadModel={this.handleShowUploadFile}
                onDelete={this.handleDeleteImage}/>
            </Tab>
            <Tab label='Districts'>
              <DistrictsView
                districts={this.props.graphics.districts}
                baseUrl={this.props.baseUrl}
                onUploadModal={this.handleShowUploadFile}
                onDelete={this.handleDeleteImage}/>
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
