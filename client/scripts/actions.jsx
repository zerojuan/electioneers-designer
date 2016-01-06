import fetch from 'isomorphic-fetch';

/*
 * Action types
 */

export const SELECT_FILE = 'SELECT_FILE';

export const REQUEST_FILES = 'REQUEST_FILES';
export const RECEIVE_FILES = 'RECEIVE_FILES';

/*
 * Action helpers
 */


function requestFiles() {
  return {
    type: REQUEST_FILES
  };
}

function receiveFiles( data ) {
  console.log( 'Data: ', data );
  return {
    type: RECEIVE_FILES,
    files: data
  };
}

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

export function fetchFilesIfNeeded() {
  return ( dispatch, getState ) => {
    if ( shouldFetchFiles( getState() ) ) {
      return dispatch( fetchFiles() );
    }
  };
}
