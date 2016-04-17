export const NEW_MESSAGE = 'NEW_MESSAGE';
export const READ_MESSAGE = 'READ_MESSAGE';

export function newMessage( message ) {
  return {
    type: NEW_MESSAGE,
    message: message
  };
};

export function readMessage( id ) {
  return {
    type: READ_MESSAGE,
    messageId: id
  };
};
