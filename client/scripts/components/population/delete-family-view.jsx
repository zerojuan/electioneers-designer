import React, { PropTypes } from 'react';

import TextField from 'material-ui/lib/text-field';
import Slider from 'material-ui/lib/slider';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import DropdownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';


import LabelTextField from '../label-textfield';

const PairFamilyList = React.createClass({
  propTypes: {
    family: PropTypes.object,
    population: PropTypes.array
  },
  render() {
    const { family, population } = this.props;

    function findFamily( id ) {
      const index = population.findIndex( ( family ) => family._id === id );
      return population[ index ];
    }

    if ( family.connections.length === 0 ) {
      return (
        <em>No connections</em>
      );
    }

    return (
      <ul>
        {
          family.connections.map( ( connection ) => {
            const familyB = findFamily( connection._id );
            return (
              <li key={connection._id}>
                { connection.description } &nbsp;
                {familyB.fatherName} {familyB.familyName}
              </li>
            );
          })
        }
      </ul>
    );
  }
});

export default React.createClass({
  propTypes: {
    family: PropTypes.object,
    population: PropTypes.array,
    districts: PropTypes.array,
    onPropChange: PropTypes.func.isRequired
  },
  handlePropChange( propName ) {
    return ( event, value ) => {
      console.log( event, value );
      this.props.onPropChange( propName, event.target.value );
    };
  },
  handleSelectChange( e, index, value ) {
    console.log( value );
    this.props.onPropChange( 'districtId', value );
  },
  render() {
    return (
      <div>
        <Tabs>
          <Tab label='Info'>
            <LabelTextField
              label="Father's name"
              value={this.props.family.fatherName}
              onChange={this.handlePropChange( 'fatherName' )}
              />
            <LabelTextField
              label='Family Name'
              value={this.props.family.familyName}
              onChange={this.handlePropChange( 'familyName' )}
              />
            <DropdownMenu value={ this.props.family.districtId }
                onChange={this.handleSelectChange}>
              {
                this.props.districts.map( ( district ) => {
                  return (
                    <MenuItem
                      key={ district._id }
                      value={ district._id }
                      primaryText={ district.name }
                      />
                  );
                })
              }
            </DropdownMenu>
          </Tab>
          <Tab label='Stats'>
            <LabelTextField
              label='Leadership'
              value={this.props.family.leadership}
              onChange={this.handlePropChange( 'leadership' )}
              />
            <LabelTextField
              label='Charm'
              value={this.props.family.charm}
              onChange={this.handlePropChange( 'charm' )}
              />
            <LabelTextField
              label='Intelligence'
              value={this.props.family.intelligence}
              onChange={this.handlePropChange( 'intelligence' )}
              />
          </Tab>
          <Tab label='Connections'>
            <PairFamilyList
              family={this.props.family}
              population={this.props.population} />
          </Tab>
        </Tabs>

      </div>
    );
  }
});
