export function changeBackground( state, action ) {
  // replace save file
  return Object.assign({}, state, {
    background: action.bgId
  });
};
