import fetch from 'isomorphic-fetch';

/*
 * Action types
 */

export const SELECT_FILE = 'SELECT_FILE';

export const REQUEST_FILES = 'REQUEST_FILES';
export const RECEIVE_FILES = 'RECEIVE_FILES';

export const REQUEST_ADD_FILE = 'REQUEST_ADD_FILES';
export const RECIEVE_ADD_FILE = 'RECEIVE_ADD_FILES';

export const REQUEST_DELETE_FILE = 'REQUEST_DELETE_FILES';
export const RECIEVE_DELETE_FILE = 'RECIEVE_DELETE_FILES';

export const REQUEST_LOAD_FILE = 'REQUEST_LOAD_FILE';
export const RECIEVE_LOAD_FILE = 'RECIEVE_LOAD_FILE';

/*
 * Action helpers
 */


function requestFiles() {
  return {
    type: REQUEST_FILES
  };
}

function receiveFiles( data ) {
  return {
    type: RECEIVE_FILES,
    files: data
  };
}

function requestAddFile() {
  return {
    type: REQUEST_ADD_FILE
  };
}

function recieveAddFile( data ) {
  return {
    type: RECIEVE_ADD_FILE,
    file: data
  };
}

function requestDeleteFile() {
  return {
    type: REQUEST_DELETE_FILE
  };
};

function recieveDeleteFile( name ) {
  console.log( 'Name: ', name );
  return {
    type: RECIEVE_DELETE_FILE,
    name: name
  };
};

function shouldFetchFiles( state ) {
  const files = state.files;

  if ( !files ) {
    return true;
  } else if ( files.isFetching ) {
    return false;
  } else {
    return files.didInvalidate;
  }
}

function fetchFiles() {
  return dispatch => {
    dispatch( requestFiles() );
    return fetch( 'http://localhost:7171/' )
      .then( response => response.json() )
      .then( json => dispatch( receiveFiles( json ) ) );
  };
}

/*
 * Action creators
 */

export function selectFile( name ) {
  return {
    type: SELECT_FILE,
    name: name
  };
}

export function addFile() {
  return dispatch => {
    dispatch( requestAddFile() );
    return fetch( 'http://localhost:7171/add', {
        method: 'post'
      })
      .then( response => response.json() )
      .then( json => dispatch( recieveAddFile( json ) ) );
  };
}

export function deleteFile( name ) {
  return dispatch => {
    dispatch( requestDeleteFile() );
    return fetch( 'http://localhost:7171/base/' + name, {
        method: 'delete'
      })
      .then( response => response.json() )
      .then( json => dispatch( recieveDeleteFile( json.name ) ) );
  };
}

export function fetchFilesIfNeeded() {
  return ( dispatch, getState ) => {
    if ( shouldFetchFiles( getState() ) ) {
      return dispatch( fetchFiles() );
    }
  };
}
