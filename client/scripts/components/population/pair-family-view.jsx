import React, { PropTypes } from 'react';

import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

const FamilyPairing = React.createClass({
  propTypes: {
    familyA: PropTypes.object.isRequired,
    familyB: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired
  },
  handleDelete( connection ) {
    return () => {
      return this.props.onDelete( this.props.familyA, connection );
    };
  },
  render() {
    const { familyA, familyB } = this.props;

    // only show connections that are relevant
    const connections = familyA.connections.reduce( ( arr, connection ) => {
      if ( connection._id === familyB._id ) {
        arr.push( connection );
      }
      return arr;
    }, []);

    return (
      <div>
        <h5>{familyA.fatherName} {familyA.familyName}</h5>
        <ul>
          {
            connections.map( ( connection, i ) => {
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
    this.props.onAddPair( connection );
  },
  handleDelete( family, connection ) {
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
          familyA={familyA}
          familyB={familyB}
          onDelete={this.handleDelete}
          />
        <PairForm
          from={familyA}
          to={familyB}
          onAdd={this.handleAdd}/>
        <FamilyPairing
          familyA={familyB}
          familyB={familyA}
          onDelete={this.handleDelete}/>
        <PairForm
          from={familyB}
          to={familyA}
          onAdd={this.handleAdd}/>
      </div>
    );
  }
});
