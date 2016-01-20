import React, { PropTypes } from 'react';


import RaisedButton from 'material-ui/lib/raised-button';

export default React.createClass({
  propTypes: {
    onNextPage: PropTypes.func.isRequired,
    onPrevPage: PropTypes.func.isRequired,
    totalItems: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired
  },
  gotoPage( page ) {
    return ( ) => {
      this.props.onGotoPage( page );
    };
  },
  render() {
    const { totalItems, pageSize, currentPage } = this.props;
    let _this = this;
    const totalPages = Math.floor( totalItems / pageSize );
    const pages = Array( totalPages ).fill().map( ( val, i ) => {
      return (
        <RaisedButton key={ i } label={ i + 1 } value={ i }
          onTouchTap={ _this.gotoPage( i ) } disabled={ currentPage === i }></RaisedButton>
      );
    });
    return (
      <div>
        <RaisedButton
          label='Prev'
          onClick={ this.props.onPrevPage }
          disabled={ currentPage === 0 }></RaisedButton>
        { pages }
        <RaisedButton
          label='Next'
          onClick={ this.props.onNextPage }
          disabled={ currentPage === totalPages }>
        </RaisedButton>
      </div>
    );
  }
});
