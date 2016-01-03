import React from 'react';
import {IndexLink, Link} from 'react-router';

import MenuIcon from 'react-material-icons/icons/navigation/menu';
import HomeIcon from 'react-material-icons/icons/action/home';
import PeopleIcon from 'react-material-icons/icons/social/people';

import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Menu from 'material-ui/lib/menus/menu';

const normalIconStyle = {
  fill: '#b0bec5'
};

const activeIconStyle = {
  fill: '#fff'
};

export default React.createClass({
  displayName: 'Sidebar',
  getDefaultProps() {
    var links = [{
      name: 'Home',
      isIndex: true,
      route: '/',
      icon: HomeIcon,
      link: IndexLink
    }, {
      name: 'Population',
      route: '/population',
      icon: PeopleIcon,
      link: Link
    }, {
      name: 'Districts',
      route: '/districts',
      icon: PeopleIcon,
      link: Link
    }, {
      name: 'Formulas',
      route: '/formulas',
      icon: PeopleIcon,
      link: Link
    }];

    return {
      title: 'Population',
      links: links,
      open: false
    };
  },
  menuTappedHandler( link ) {
    return ( event ) => {
      this.props.handleClose( link );
    }
  },
  render() {
    var active = this.props.routes[ 1 ];
    var that = this;
    return (

      <LeftNav
        open={this.props.open}
      >
        {
          this.props.links.map( function( item, i ) {

            var isActive = item.name === active.name;
            var icon = <item.icon></item.icon>;
            var link = <item.link to={item.route}></item.link>;

            return (
                <MenuItem leftIcon={icon} primaryText={item.name} containerElement={link} key={i} onTouchTap={that.menuTappedHandler(item.route)}>
                </MenuItem>
            );
          })
        }
      </LeftNav>
    )
  }
});
