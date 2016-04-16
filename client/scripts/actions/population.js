import fetch from 'isomorphic-fetch';

export const BATCH_GENERATE_FAMILY = 'BATCH_GENERATE_FAMILY';
export const EDIT_FAMILY = 'EDIT_FAMILY';
export const PAIR_FAMILY = 'PAIR_FAMILY';


export function batchGenerateFamily({ count, wealth, districts }) {
  return {
    type: BATCH_GENERATE_FAMILY,
    count: count,
    wealth: wealth,
    districts: districts
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
