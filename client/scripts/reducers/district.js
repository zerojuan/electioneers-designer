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

  if ( !district.position ) {
    district.position = {
      x: 0,
      y: 0
    };
  }

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

export function pairDistrict( state, action ) {
  const { districtA, districtB } = action;

  // update district
  if ( !districtA.connections ) {
    districtA.connections = [];
  }

  if ( !districtB.connections ) {
    districtB.connections = [];
  }

  districtA.connections.push( districtB._id );
  districtB.connections.push( districtA._id );

  return updateDistrict( updateDistrict( state, districtA ), districtB );
}
