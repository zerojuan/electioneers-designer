import React, { PropTypes } from 'react';

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import DropdownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';

import LabelTextField from '../label-textfield';

export default React.createClass({
  getInitialState() {
    return {
      selectedImage: this.props.district.image
    };
  },
  handlePropChange( propName ) {
    return ( event ) => {
      this.props.onPropChange( propName, event.target.value );
    };
  },
  handleSelectImage( e, index, value ) {
    this.setState({
      selectedImage: value
    });
    this.props.onPropChange( 'image', value );
  },
  render() {
    return (
      <div>
        <Tabs>
          <Tab label='info'>
            <LabelTextField
              label='Name'
              value={this.props.district.name}
              onChange={this.handlePropChange( 'name' )}
              />
            <DropdownMenu value={ this.state.selectedImage } onChange={this.handleSelectImage }>
              {
                this.props.images.map( ( image ) => {
                  return (
                    <MenuItem
                      key={ image.id }
                      value={ image.id }
                      primaryText={ image.name }
                      />
                  );
                })
              }
            </DropdownMenu>
          </Tab>
        </Tabs>
      </div>
    );
  }
});
