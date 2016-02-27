import { guid } from './utils';

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
