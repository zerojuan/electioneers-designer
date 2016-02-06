import React, { PropTypes } from 'react';

import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import PeopleIcon from 'react-material-icons/icons/social/people';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import EditIcon from 'material-ui/lib/svg-icons/action/perm-identity';


import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';

import Paginator from './paginator';

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
    onEditFamily: PropTypes.func.isRequired
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
      console.log( 'Clicked this family: ', family.fatherName );
      // this can't be changed
      this.props.onEditFamily( family );
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn tooltip='Fathers Name'>Father Name</TableHeaderColumn>
            <TableHeaderColumn tooltip='Wealth'>Wealth</TableHeaderColumn>
            <TableHeaderColumn tooltip='Intelligence'>Int</TableHeaderColumn>
            <TableHeaderColumn tooltip='Charisma'>Charm</TableHeaderColumn>
            <TableHeaderColumn tooltip='Leadership'>Leadership</TableHeaderColumn>
            <TableHeaderColumn tooltip='Actions'>Actions</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            page.map( ( family ) => {
                return (
                  <TableRow key={family._id}>
                    <TableRowColumn>{family.fatherName + ' ' + family.familyName}</TableRowColumn>
                    <TableRowColumn>{family.wealth}</TableRowColumn>
                    <TableRowColumn>{family.intelligence}</TableRowColumn>
                    <TableRowColumn>{family.charm}</TableRowColumn>
                    <TableRowColumn>{family.leadership}</TableRowColumn>
                    <TableRowColumn>
                      <FloatingActionButton mini={true} onTouchTap={this.handleShowEditFamily( family )}>
                        <EditIcon />
                      </FloatingActionButton>
                    </TableRowColumn>
                  </TableRow>
                );
            })
          }
        </TableBody>
      </Table>
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
