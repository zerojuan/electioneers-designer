import { combineReducers } from 'redux';
import { SELECT_SAVED_FILE, REQUEST_FILES, RECEIVE_FILES } from './actions';

function files( state, action ) {
  switch( action.type ) {
    case SELECT_SAVED_FILE:
      if( state.name !== action.name ) {
        return state;
      }

      return {
        ...state,
        selected: true
      };
    case REQUEST_FILES:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_FILES:
    console.log( 'Received files: ', state, action.files );
      return Object.assign({}, state, action.files);
    default:
      return state;
  }
}

function savedFiles( state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action ) {
  switch( action.type ) {
    case SELECT_SAVED_FILE:
      // return state.files.map( f =>
      //   files( f, action )
      // );
    case REQUEST_FILES:
      return Object.assign( {}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_FILES:
    console.log( 'Receive files...', action);
      return Object.assign( {}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.files
      });
    default:
      return state;
  }
}

const designerApp = combineReducers({
  savedFiles
});

export default designerApp;
