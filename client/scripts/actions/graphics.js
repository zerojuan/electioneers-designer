import fetch from 'isomorphic-fetch';

export const RECIEVE_GRAPHICS_FILE = 'RECIEVE_GRAPHICS_FILE';
export const REQUEST_GRAPHICS_FILE = 'REQUEST_GRAPHICS_FILE';

function recieveLoadFile( data ) {
  return {
    type: RECIEVE_GRAPHICS_FILE,
    graphics: data
  };
};

function requestLoadFile() {
  return {
    type: REQUEST_GRAPHICS_FILE
  };
};

function fetchGraphics() {
  return dispatch => {
    dispatch( requestLoadFile() );
    console.log( 'Getting graphics...' );
    return fetch( 'http://localhost:7171/graphics/' )
      .then( response => response.json() )
      .then( json => dispatch( recieveLoadFile( json ) ) );
  };
}

export function loadGraphics() {
  return ( dispatch, getState ) => {
    return dispatch( fetchGraphics() );
  };
}
