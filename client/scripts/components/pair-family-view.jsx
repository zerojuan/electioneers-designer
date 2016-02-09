import React, { PropTypes } from 'react';

import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

const FamilyPairing = React.createClass({
  propTypes: {
    family: PropTypes.object.isRequired
  },
  render() {
    const { family } = this.props;
    return (
      <div>
        <h5>{family.fatherName} {family.familyName}</h5>
        <ul>

        </ul>
      </div>
    )
  }
});

const PairForm = React.createClass({
  propTypes: {
    onAdd: PropTypes.func.isRequired
  },
  getInitialState() {
    return {
      description: ''
    }
  },
  handleAdd() {
    this.props.onAdd({
      description: this.state.description
    });
  },
  handleChange( event ) {
    this.setState({
      description: event.target.value
    });
  },
  render() {
    return (
      <row>
        <TextField value={this.state.description} onChange={this.handleChange}/>
        <FlatButton label='Add' onTouchTap={this.handleAdd}/>
      </row>
    )
  }
})

export default React.createClass({
  propTypes: {
    familyA: PropTypes.object,
    familyB: PropTypes.object,
    onDeletePair: PropTypes.func.isRequired,
    onAddPair: PropTypes.func.isRequired
  },
  handleAdd( connection ) {
    console.log( 'I AM Adding...', connection );
  },
  render() {

    if ( !this.props.familyA ) {
      return (<div></div>);
    }

    const { familyA, familyB } = this.props;

    return (
      <div>
        <FamilyPairing
          family={familyA}
          />
        <PairForm
          onAdd={this.handleAdd}/>
        <FamilyPairing
          family={familyB}/>
        <PairForm
          onAdd={this.handleAdd}/>
      </div>
    );
  }
});
