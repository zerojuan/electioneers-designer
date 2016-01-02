import React from 'react';

export default React.createClass({
  render: function(){
    return (
      <div className="card">
        <div className="card__header">
          <h2 className="card__title">
            Saved Files
          </h2>
        </div>
        <div className="card__content">
          <ul>
            {
              this.props.files.map( function( item, i ){
                return (
                  <li key={i}>
                    { item.name }
                  </li>
                )
              })
            }
          </ul>
        </div>

      </div>
    );
  }
});
