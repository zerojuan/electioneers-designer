import fetch from 'isomorphic-fetch';

export const RECIEVE_GRAPHICS_FILE = 'RECIEVE_GRAPHICS_FILE';
export const REQUEST_GRAPHICS_FILE = 'REQUEST_GRAPHICS_FILE';
export const REQUEST_FILE_UPLOAD = 'REQUEST_FILE_UPLOAD';

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

function requestFileUpload() {
  return {
    type: REQUEST_FILE_UPLOAD
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

export function uploadGraphics( data ) {
  return dispatch => {
    dispatch( requestFileUpload() );
    console.log( 'Trying to upload...' );
    let body = new FormData();
    body.append( 'file', data.file, 'thefile' );
    body.append( 'name', data.filename );
    body.append( 'type', data.type );
    return fetch( 'http://localhost:7171/graphics/upload', {
        method: 'post',
        headers: {
          'Accept': 'application/json'
        },
        body: body
      })
      .then( response => response.json() )
      .then( json => dispatch( recieveLoadFile( json ) ) );
  };
}
