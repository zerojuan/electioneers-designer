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
      addImageDialogOpen: false,
      imageType: 'backgrounds'
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
  handleTabChange( value ) {
    this.setState({
      imageType: value
    });
  },
  handleAddImage( data ) {
    const { dispatch } = this.props;

    data.type = this.state.imageType;
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
          <Tabs onChange={this.handleTabChange}>
            <Tab label='Backgrounds' value='backgrounds'>
              <BackgroundView
                backgrounds={this.props.graphics.backgrounds}
                baseUrl={this.props.baseUrl}
                onUploadModal={this.handleShowUploadFile}
                onDelete={this.handleDeleteImage}/>
            </Tab>
            <Tab label='Districts' value='districts'>
              <DistrictsView
                districts={this.props.graphics.districts}
                baseUrl={this.props.baseUrl}
                onUploadModal={this.handleShowUploadFile}
                onDelete={this.handleDeleteImage}/>
            </Tab>
            <Tab label='Portraits' value='portraits'>
              <p> Portraits </p>
            </Tab>
            <Tab label='Logos' value='logos'>
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
