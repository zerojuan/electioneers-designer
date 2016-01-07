import { combineReducers } from 'redux';
import {
  SELECT_FILE,
  REQUEST_FILES,
  RECEIVE_FILES,
  REQUEST_ADD_FILE,
  RECIEVE_ADD_FILE,
  REQUEST_DELETE_FILE,
  RECIEVE_DELETE_FILE } from './actions';

function addFile( state, action ) {
  return [
    ...state,
    action.file
  ];
}

function deleteFile( state, action ) {
  // find index
  console.log( action, state );
  return state.filter( item => item.name !== action.name );
}

function savedFiles( state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action ) {
  switch ( action.type ) {
    case REQUEST_FILES:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_FILES:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.files
      });
    case REQUEST_ADD_FILE:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: true
      });
    case RECIEVE_ADD_FILE:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: addFile( state.items, action )
      });
    case REQUEST_DELETE_FILE:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: true
      });
    case RECIEVE_DELETE_FILE:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: deleteFile( state.items, action )
      });
    default:
      return state;
  }
}

function selectedFile( state = 'none', action ) {
  switch ( action.type ) {
    case SELECT_FILE:
      return action.name;
    default:
      return state;
  }
}

const designerApp = combineReducers({
  savedFiles,
  selectedFile
});

export default designerApp;
