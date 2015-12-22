import React from 'react';
import {Link} from 'react-router';
import MenuIcon from 'react-material-icons/icons/navigation/menu';
import HomeIcon from 'react-material-icons/icons/action/home';
import PeopleIcon from 'react-material-icons/icons/social/people';

const iconStyle = {
  fill: '#b0bec5'
};

export default React.createClass({
  displayName: 'Sidebar',
  getDefaultProps() {
    return {
      title: 'Population'
    };
  },
  render() {
    return (
      <div className="dashboard__sidebar">
        <div className="dashboard__sidebar-scroll">
          <ul id="menu">
            <li>
              <Link to="/"><HomeIcon className='material-icons' style={iconStyle}/>Home</Link>
            </li>
            <li>
              <Link to="/population"><PeopleIcon className='material-icons' style={iconStyle}/>Population</Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
});
