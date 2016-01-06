import React, { Component, PropTypes } from 'react';
import {IndexLink, Link} from 'react-router';

import MenuIcon from 'react-material-icons/icons/navigation/menu';
import HomeIcon from 'react-material-icons/icons/action/home';
import PeopleIcon from 'react-material-icons/icons/social/people';

import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Menu from 'material-ui/lib/menus/menu';
import Divider from 'material-ui/lib/divider';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

const normalIconStyle = {
  fill: '#b0bec5'
};

const activeIconStyle = {
  fill: '#fff'
};

export default React.createClass({
  displayName: 'Sidebar',
  getDefaultProps() {
    var links = [ {
      name: 'Population',
      route: '/population',
      icon: PeopleIcon
    }, {
      name: 'Districts',
      route: '/districts',
      icon: PeopleIcon
    }, {
      name: 'Formulas',
      route: '/formulas',
      icon: PeopleIcon
    } ];

    return {
      links: links,
      open: false
    };
  },
  propTypes: {
    open: PropTypes.bool.isRequired,
    links: PropTypes.arrayOf( PropTypes.shape({
      name: PropTypes.string,
      route: PropTypes.string.isRequired
    }).isRequired ).isRequired,
    selectedFile: PropTypes.string.isRequired
  },
  menuTappedHandler( link ) {
    return ( event ) => {
      this.props.handleClose( link );
    };
  },
  render() {
    var active = this.props.routes[ 1 ];
    let { selectedFile } = this.props;
    var that = this;
    let content = <MenuItem primaryText='Well'/>;

    if ( selectedFile !== 'none' ) {
      content = (
        <List subheader='LoadedFile'>
          <ListItem
            primaryText={this.props.selectedFile}
            initiallyOpen={true}
            containerElement={<Link to={selectedFile + '/'}/>}
            onTouchTap={that.menuTappedHandler( '/' )}
            nestedItems={
              this.props.links.map(function( item, i ) {
                let isActive = item.name === active.name;
                let name = item.name || selectedFile;
                let icon = <item.icon></item.icon>;
                let link = <Link to={selectedFile + item.route}></Link>;

                return (
                    <ListItem
                      leftIcon={icon}
                      primaryText={name}
                      containerElement={link}
                      key={i}
                      insetChildren={true}
                      onTouchTap={that.menuTappedHandler( item.route )}>
                    </ListItem>
                );
              })
            }
          />
        </List>
      );
    }

    return (

      <LeftNav
        open={this.props.open}
      >
        <MenuItem
          leftIcon={<HomeIcon/>}
          primaryText='Home'
          containerElement={<IndexLink to='/'/>}
          onTouchTap={that.menuTappedHandler( '/' )}/>
        <Divider/>
        {
          content
        }
      </LeftNav>
    );
  }
});
