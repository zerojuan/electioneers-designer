import React from 'react';
import {IndexLink, Link} from 'react-router';
import MenuIcon from 'react-material-icons/icons/navigation/menu';
import HomeIcon from 'react-material-icons/icons/action/home';
import PeopleIcon from 'react-material-icons/icons/social/people';

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
      links: links
    };
  },
  render() {
    var active = this.props.routes[ 1 ];
    
    return (
      <div className="dashboard__sidebar">
        <div className="dashboard__sidebar-scroll">
          <ul id="menu">
            {
              this.props.links.map( function( item, i ) {
                var isActive = item.name === active.name;

                return (
                  <li key={i}>
                    <item.link to={ item.route } className={ isActive ? 'active' : '' } >
                      <item.icon className='material-icons' style={ isActive ? activeIconStyle : normalIconStyle }/>
                      {item.name}
                    </item.link>
                  </li>
                );
              })
            }
          </ul>
        </div>
      </div>
    )
  }
});
