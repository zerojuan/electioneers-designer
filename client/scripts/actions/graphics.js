import fetch from 'isomorphic-fetch';

export const RECIEVE_GRAPHICS_FILE = 'RECIEVE_GRAPHICS_FILE';
export const REQUEST_GRAPHICS_FILE = 'REQUEST_GRAPHICS_FILE';
export const REQUEST_FILE_UPLOAD = 'REQUEST_FILE_UPLOAD';
export const REQUEST_DELETE_IMAGE = 'REQUEST_DELETE_IMAGE';
export const RECIEVE_DELETE_IMAGE = 'RECIEVE_DELETE_IMAGE';
export const REQUEST_EDIT_IMAGE = 'REQUEST_EDIT_IMAGE';
export const RECIEVE_EDIT_IMAGE = 'RECIEVE_EDIT_IMAGE';

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

function requestDeleteImage( type, data ) {
  return {
    type: REQUEST_DELETE_IMAGE,
    data: data,
    imageType: type
  };
}

function recieveDeleteImage( data ) {
  return {
    type: RECIEVE_DELETE_IMAGE,
    data: data.data,
    imageType: data.type
  };
}

function requestEditImage( type, data ) {
  return {
    type: REQUEST_EDIT_IMAGE,
    data: data,
    imageType: data.type
  };
}

function recieveEditImage( data ) {
  return {
    type: RECIEVE_EDIT_IMAGE,
    data: data.data,
    imageType: data.type
  };
}

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

export function deleteGraphics( type, data ) {
  return dispatch => {
    dispatch( requestDeleteImage( type, data ) );
    return fetch( 'http://localhost:7171/graphics', {
        method: 'delete',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: type,
          data: data
        })
      })
      .then( response => response.json() )
      .then( json => dispatch( recieveDeleteImage( json ) ) );
  };
}


export function editGraphic( type, data ) {
  return dispatch => {
    dispatch( requestEditImage( type, data ) );
    return fetch( 'http://localhost:7171/graphics/' + data.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: type,
        data: data
      })
    })
    .then( response => response.json() )
    .then( json => dispatch( recieveEditImage( json ) ) );
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
