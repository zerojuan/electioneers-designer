import _ from 'lodash';

import { guid } from './utils';

export function newMessage( state, action ) {
  return [
    ...state,
    {
      id: guid(),
      message: action.message
    }
  ];
};

export function readMessage( state, action ) {
  // search which item to delete
  const { messageId } = action;
  let index = _.findIndex( state, ( message ) =>
    message.id === messageId );

  return [
    ...state.slice( 0, index ),
    ...state.slice( index + 1 )
  ];
};
