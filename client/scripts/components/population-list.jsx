import React from 'react';

import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';

export default React.createClass({
  render() {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn tooltip='Fathers Name'>Father Name</TableHeaderColumn>
            <TableHeaderColumn tooltip='Wealth'>Wealth</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            this.props.population.map( ( family ) => {
                return (
                  <TableRow key={family._id}>
                    <TableRowColumn>{family.fatherName + ' ' + family.familyName}</TableRowColumn>
                    <TableRowColumn>9</TableRowColumn>
                  </TableRow>
                );
            })
          }
        </TableBody>
      </Table>
    );
  }
});
