import fetch from 'isomorphic-fetch';

export const CREATE_DISTRICT = 'CREATE_DISTRICT';
export const EDIT_DISTRICT = 'EDIT_DISTRICT';
export const PAIR_DISTRICT = 'PAIR_DISTRICT';
export const CHANGE_BACKGROUND = 'CHANGE_BACKGROUND';


export function createDistrict( district ) {
  return {
    type: CREATE_DISTRICT,
    district: district
  };
}

export function editDistrict( district ) {
  return {
    type: EDIT_DISTRICT,
    district: district
  };
}

export function pairDistrict( districtA, districtB ) {
  return {
    type: PAIR_DISTRICT,
    districtA: districtA,
    districtB: districtB
  };
}

export function changeBackground( bgId ) {
  return {
    type: CHANGE_BACKGROUND,
    bgId: bgId
  };
}
