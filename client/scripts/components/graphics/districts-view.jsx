import React, { PropTypes } from 'react';

import ImagesList from './images-list';
import ImageDetails from './image-details';

export default React.createClass({
  getInitialState() {
    return {
      selected: this.props.districts[ 0 ]
    };
  },
  propTypes: {
    districts: PropTypes.array.isRequired,
    baseUrl: PropTypes.string.isRequired
  },
  handleSelectItem( index ) {
    // set selected based on item
    const { districts } = this.props;
    const i = districts.findIndex( ( d ) => d.id === index );
    this.setState({
      selected: this.props.districts[ i ]
    });
  },
  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-xs-4'>
            <ImagesList
              images={this.props.districts}
              baseUrl={this.props.baseUrl}
              onChange={this.handleSelectItem}/>
          </div>
          <div className='col-xs-8'>
            <ImageDetails
              image={this.state.selected}
              baseUrl={this.props.baseUrl}
              />
          </div>
        </div>

      </div>
    );
  }
});
