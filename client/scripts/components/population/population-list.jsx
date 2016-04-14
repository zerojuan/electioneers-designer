import React, { PropTypes } from 'react';

import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import PeopleIcon from 'react-material-icons/icons/social/people';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import EditIcon from 'material-ui/lib/svg-icons/action/perm-identity';


import td from 'material-ui/lib/table/table-row-column';

import Paginator from '../paginator';

export default React.createClass({
  getInitialState() {
    return {
      currentPage: 0,
      pageSize: 20
    };
  },
  propTypes: {
    population: PropTypes.arrayOf( PropTypes.shape({
      _id: PropTypes.string.isRequired,
      fatherName: PropTypes.string.isRequired,
      familyName: PropTypes.string.isRequired
    }).isRequired ).isRequired,
    onCellSelected: PropTypes.func.isRequired
  },
  handleNextPage() {
    this.setState({
      currentPage: this.state.currentPage + 1
    });
  },
  handlePrevPage() {
    this.setState({
      currentPage: this.state.currentPage - 1
    });
  },
  handleGotoPage( page ) {
    this.setState({
      currentPage: page
    });
  },
  handleShowEditFamily( family ) {
    return () => {
      this.props.onCellSelected( family );
    }
  },
  render() {
    // only load the first 10
    const { currentPage, pageSize } = this.state;
    const start = pageSize * currentPage;
    const end = start + pageSize;
    let page = this.props.population.slice( start, end );
    return (
      <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Wealth</th>
            <th>Int</th>
            <th>Char</th>
            <th>Lead</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            page.map( ( family ) => {
                return (
                  <tr key={family._id}>
                    <td>{family.fatherName + ' ' + family.familyName}</td>
                    <td>{family.wealth}</td>
                    <td>{family.intelligence}</td>
                    <td>{family.charm}</td>
                    <td>{family.leadership}</td>
                    <td>
                      <FloatingActionButton mini={true} onTouchTap={this.handleShowEditFamily( family )}>
                        <EditIcon />
                      </FloatingActionButton>
                    </td>
                  </tr>
                );
            })
          }
        </tbody>
      </table>
      <Paginator
        currentPage={this.state.currentPage}
        totalItems={this.props.population.length}
        onNextPage={this.handleNextPage}
        onPrevPage={this.handlePrevPage}
        onGotoPage={this.handleGotoPage}
        pageSize={this.state.pageSize}>
      </Paginator>
      </div>
    );
  }
});
