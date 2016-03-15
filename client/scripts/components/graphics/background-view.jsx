import React, { PropTypes } from 'react';

export default React.createClass({
  propTypes: {
    backgrounds: PropTypes.array.isRequired,
    baseUrl: PropTypes.string.isRequired
  },
  render() {
    return (
      <div>
        {
          this.props.backgrounds.map( ( background ) => {
            return (
              <div key={background.id}>
                <h1> { background.file }</h1>
                <img src={ this.props.baseUrl + background.file }/>
              </div>
            );
          })
        }
      </div>
    );
  }
});
