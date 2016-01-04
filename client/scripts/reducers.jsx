import { combineReducers } from 'redux';
import { SELECT_SAVED_FILE } from './actions';

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
    default:
      return state;
  }
}

function savedFiles( state = [], action ) {
  switch( action.type ) {
    case SELECT_SAVED_FILE:
      return state.map( f =>
        files( f, action )
      );
    default:
      return state;
  }
}

const designerApp = combineReducers({
  savedFiles
});

export default designerApp;
