import React from 'react';

const FormulasPage = React.createClass({
  displayName: 'Formulas',
  getDefaultProps() {
    return {
      title: 'Formulas'
    };
  },
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <p>{this.props.selectedFile}</p>
      </div>
    );
  }
});

export default FormulasPage;
