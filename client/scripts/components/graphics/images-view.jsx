import React, { PropTypes } from 'react';

import _ from 'lodash';

import RaisedButton from 'material-ui/lib/raised-button';

import ImagesList from './images-list';
import ImageDetails from './image-details';

export default React.createClass({
  getInitialState() {
    return {
      selected: this.props.images[ 0 ]
    };
  },
  propTypes: {
    images: PropTypes.array.isRequired,
    baseUrl: PropTypes.string.isRequired,
    onUploadModal: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
  },
  componentWillReceiveProps( nextProps ) {
    const { images } = nextProps;
    const i = images.findIndex( ( d ) => d.id === this.state.selected.id );
    if ( i < 0 ) {
      this.setState({
        selected: this.props.images[ 0 ]
      });
    }
  },
  handleSelectItem( index ) {
    // set selected based on item
    const { images } = this.props;
    const i = images.findIndex( ( d ) => d.id === index );
    this.setState({
      selected: this.props.images[ i ]
    });
  },
  handleShowUploadImage( ) {
    this.props.onUploadModal( this.props.type );
  },
  handleDeleteImage() {
    this.props.onDelete( this.props.type, this.state.selected );
  },
  handleEditImage() {
    console.log( this.state.selected );
    this.props.onEdit( this.props.type, this.state.selected );
  },
  handleMetadataChange( value ) {
    const selected = _.assign({}, this.state.selected );
    selected.name = value;
    this.setState({
      selected: selected
    });
  },
  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-xs-4'>
            <RaisedButton label='Add' primary={true} onTouchTap={this.handleShowUploadImage}/>
            <ImagesList
              images={this.props.images}
              baseUrl={this.props.baseUrl}
              onChange={this.handleSelectItem}/>
          </div>
          <div className='col-xs-8'>
            <ImageDetails
              image={this.state.selected}
              onChange={this.handleMetadataChange}
              baseUrl={this.props.baseUrl}
              />
            <RaisedButton label='Save' primary={true} onTouchTap={this.handleEditImage}/>
            &nbsp;
            <RaisedButton label='Delete' primary={true} onTouchTap={this.handleDeleteImage}/>
          </div>
        </div>
      </div>
    );
  }
});
