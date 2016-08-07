import fetch from 'isomorphic-fetch';

import { newMessage } from './messages';

export const BATCH_GENERATE_FAMILY = 'BATCH_GENERATE_FAMILY';
export const ADD_FAMILY = 'ADD_FAMILY';
export const EDIT_FAMILY = 'EDIT_FAMILY';
export const PAIR_FAMILY = 'PAIR_FAMILY';
export const DELETE_FAMILY = 'DELETE_FAMILY';
export const RANDOMIZE_HOMES = 'RANDOMIZE_HOMES';


export function batchGenerateFamily({ count, wealth, districts }) {
  return {
    type: BATCH_GENERATE_FAMILY,
    count: count,
    wealth: wealth,
    districts: districts
  };
}

export function addFamily( family ) {
  return {
    type: ADD_FAMILY,
    family: family
  };
}

export function editFamily( family ) {
  return {
    type: EDIT_FAMILY,
    family: family
  };
}

export function pairFamily( familyA, familyB ) {
  return {
    type: PAIR_FAMILY,
    familyA: familyA,
    familyB: familyB
  };
}

export function deleteFamily( family ) {
  if ( !!family.connections.length ) {
    return newMessage( 'Cannot delete!' );
  }

  return {
    type: DELETE_FAMILY,
    family: family
  };
}

export function randomizeHomes( districts ) {
  return {
    type: RANDOMIZE_HOMES,
    districts
  };
}
