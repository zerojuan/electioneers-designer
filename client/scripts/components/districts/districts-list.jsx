import React, { PropTypes } from 'react';

import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import EditIcon from 'material-ui/lib/svg-icons/action/perm-identity';

export default React.createClass({
  getInitialState() {
    return {
      currentPage: 0,
      pageSize: 10
    };
  },
  handleAddDistrict( district ) {
    return () => {
      this.props.onShowAdd( district );
    };
  },
  handleEditDistrict( district ) {
    return () => {
      this.props.onShowEdit( district );
    };
  },
  handleDeleteDistrict( district ) {
    return () => {
      this.props.onShowDelete( district );
    };
  },
  render() {
    // only load the first 10
    const { currentPage, pageSize } = this.state;
    const start = pageSize * currentPage;
    const end = start + pageSize;
    const page = this.props.districts.slice( start, end );
    const totalPopulation = this.props.population;
    return (
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn tooltip='Name'>Name</TableHeaderColumn>
              <TableHeaderColumn tooltip='Issues'>Issues</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              page.map( ( district ) => {
                  return (
                    <TableRow key={district._id}>
                      <TableRowColumn>{district.name} - { totalPopulation.filter( ( resident ) => { return resident.districtId === district._id } ).length }</TableRowColumn>
                      <TableRowColumn>Stuffs</TableRowColumn>
                      <TableRowColumn>
                        <FloatingActionButton mini={true}
                          onTouchTap={this.handleAddDistrict( district )}>
                          <EditIcon />
                        </FloatingActionButton>
                        <FloatingActionButton mini={true}
                          onTouchTap={this.handleEditDistrict( district )}>
                          <EditIcon />
                        </FloatingActionButton>
                        <FloatingActionButton mini={true}
                          onTouchTap={this.handleDeleteDistrict( district )}>
                          <EditIcon />
                        </FloatingActionButton>
                      </TableRowColumn>
                    </TableRow>
                  );
              })
            }
          </TableBody>
        </Table>
      </div>
    );
  }
});
