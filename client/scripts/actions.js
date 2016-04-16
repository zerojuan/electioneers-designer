import fetch from 'isomorphic-fetch';

/*
 * Action types
 */

export const SELECT_FILE = 'SELECT_FILE';
export const UNSELECT_FILE = 'UNSELECT_FILE';

export const REQUEST_FILES = 'REQUEST_FILES';
export const RECEIVE_FILES = 'RECEIVE_FILES';

export const REQUEST_SAVE_FILE = 'REQUEST_SAVE_FILE';
export const RECIEVE_SAVE_FILE = 'RECIEVE_SAVE_FILE';

export const REQUEST_ADD_FILE = 'REQUEST_ADD_FILES';
export const RECIEVE_ADD_FILE = 'RECEIVE_ADD_FILES';

export const REQUEST_DELETE_FILE = 'REQUEST_DELETE_FILES';
export const RECIEVE_DELETE_FILE = 'RECIEVE_DELETE_FILES';

export const REQUEST_LOAD_FILE = 'REQUEST_LOAD_FILE';
export const RECIEVE_LOAD_FILE = 'RECIEVE_LOAD_FILE';
export const REQUEST_LOAD_FILE_FAILED = 'REQUEST_LOAD_FILE_FAILED';

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

function requestSaveFile( name ) {
  return {
    type: REQUEST_SAVE_FILE,
    name: name
  };
};

function recieveSaveFile( name ) {
  return {
    type: RECIEVE_SAVE_FILE,
    name: name
  };
};

function requestLoadFile( name ) {
  return {
    type: REQUEST_LOAD_FILE,
    name: name
  };
};

function errorLoadFile( errResponse ) {
  return {
    type: REQUEST_LOAD_FILE_FAILED,
    errResponse: errResponse
  };
}

function recieveLoadFile( data ) {
  return {
    type: RECIEVE_LOAD_FILE,
    districts: data.districts,
    population: data.population,
    config: data.config
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

function shouldLoadFile( state, name ) {
  const selectedFile = state.selectedFile;

  // if i'm loading anything other than the already loaded file
  if ( selectedFile !== name ) {
    return true;
  } else {
    return false;
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

function fetchFile( name ) {
  return dispatch => {
    dispatch( requestLoadFile() );
    return fetch( 'http://localhost:7171/base/' + name )
      .then( response => {
        if ( response.status >= 400 ) {
          let error = new Error( response.statusText );
          error.response = response;
          throw error;
        }
        return response.json();
      })
      .then( json => dispatch( recieveLoadFile( json ) ) )
      .catch( error=> dispatch( errorLoadFile( error.response ) ) );
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

export function unselectFile( ) {
  return {
    type: UNSELECT_FILE
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

export function saveFile( name ) {
  return ( dispatch, getState ) => {
    console.log( 'Going to save file' );
    dispatch( requestSaveFile() );
    return fetch( 'http://localhost:7171/base/' + name, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        districts: getState().districts,
        population: getState().population,
        config: getState().config,
        actions: getState().actions
      })
    })
    .then( response => response.json() )
    .then( json => dispatch( recieveSaveFile( json.name ) ) );
  };
}

export function loadFileIfNeeded( name ) {
  return ( dispatch, getState ) => {
    console.log( 'Loading file... ', name );
    if ( shouldLoadFile( getState(), name ) ) {
      return dispatch( fetchFile( name ) );
    }
  };
}

export function fetchFilesIfNeeded( name ) {
  return ( dispatch, getState ) => {
    if ( shouldFetchFiles( getState() ) ) {
      return dispatch( fetchFiles() );
    }
  };
}
