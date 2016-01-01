import React from 'react';

import MenuIcon from 'react-material-icons/icons/navigation/menu';

export default React.createClass({
  displayName: 'Sidebar Toggle',
  render() {
    return (
      <div>
        <a href="#" className="sidebar-toggle" onClick={this.props.toggle} ><i><MenuIcon/></i></a>
      </div>
    )
  }
})
