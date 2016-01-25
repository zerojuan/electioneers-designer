import React from 'react';

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
