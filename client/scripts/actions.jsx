/*
 * Action types
 */

export const SELECT_SAVED_FILE = 'SELECT_SAVED_FILE';

export function selectSavedFile( name ) {
  return {
    type: SELECT_SAVED_FILE,
    name: name
  };
}
