import React, { PropTypes } from 'react';

import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

const FamilyPairing = React.createClass({
  propTypes: {
    family: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired
  },
  handleDelete( connection ) {
    return () => {
      return this.props.onDelete( this.props.family, connection );
    };
  },
  render() {
    const { family } = this.props;
    return (
      <div>
        <h5>{family.fatherName} {family.familyName}</h5>
        <ul>
          {
            family.connections.map( ( connection, i ) => {
              return (
                <li key={i}>
                  {connection.description}
                  <FlatButton label='x' onTouchTap={this.handleDelete( connection )}/>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
});

const PairForm = React.createClass({
  propTypes: {
    form: PropTypes.object,
    to: PropTypes.object,
    onAdd: PropTypes.func.isRequired
  },
  getInitialState() {
    return {
      description: ''
    }
  },
  handleAdd() {
    this.props.onAdd({
      from: this.props.from,
      to: this.props.to,
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
    // bubble up the event
    this.props.onAddPair( connection );
  },
  handleDelete( family, connection ) {
    console.log( 'Let\'s delete', connection );
    this.props.onDeletePair( family, connection );
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
          onDelete={this.handleDelete}
          />
        <PairForm
          from={familyA}
          to={familyB}
          onAdd={this.handleAdd}/>
        <FamilyPairing
          family={familyB}
          onDelete={this.handleDelete}/>
        <PairForm
          from={familyB}
          to={familyA}
          onAdd={this.handleAdd}/>
      </div>
    );
  }
});
