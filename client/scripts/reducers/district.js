
function guid() {
  function s4() {
    return Math.floor( (1 + Math.random() ) * 0x10000 )
      .toString( 16 )
      .substring( 1 );
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function updateDistrict( districts, district ) {
  // find item index
  const index = districts.findIndex( ( el ) => el._id === district._id );

  return [
    ...districts.slice( 0, index ),
    district,
    ...districts.slice( index + 1 )
  ];
}

export function createDistrict( districts, action ) {
  const district = action.district;

  // TODO: guid should be it's own file
  district._id = guid();

  return [
    ...districts,
    district
  ];
}

export function editDistrict( state, action ) {
  const district = action.district;

  // find item index
  return updateDistrict( state, district );
}
