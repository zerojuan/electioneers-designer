import { combineReducers } from 'redux';
import { SELECT_FILE, REQUEST_FILES, RECEIVE_FILES } from './actions';

function savedFiles( state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action ) {
  switch( action.type ) {
    case REQUEST_FILES:
      return Object.assign( {}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_FILES:
      return Object.assign( {}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.files
      });
    default:
      return state;
  }
}

function selectedFile( state = 'none', action ) {
  switch( action.type ) {
    case SELECT_FILE:
      return action.name
    default:
      return state;
  }
}

const designerApp = combineReducers({
  savedFiles,
  selectedFile
});

export default designerApp;
