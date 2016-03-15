import React, { PropTypes } from 'react';

export default React.createClass({
  propTypes: {
    backgrounds: PropTypes.array
  },
  render() {
    return (
      <div>
        {
          this.props.backgrounds.map( ( background ) => {
            return (
              <div>
                <h1> { background.file }</h1>
                <img src={ 'http://localhost:7171/image/' + background.file }/>
              </div>

            );
          })
        }
      </div>
    );
  }
});
