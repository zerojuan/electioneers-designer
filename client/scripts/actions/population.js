import fetch from 'isomorphic-fetch';

export const BATCH_GENERATE_FAMILY = 'BATCH_GENERATE_FAMILY';
export const EDIT_FAMILY = 'EDIT_FAMILY';


export function batchGenerateFamily({ count, wealth }) {
  return {
    type: BATCH_GENERATE_FAMILY,
    count: count,
    wealth: wealth
  };
}

export function editFamily( family ) {
  return {
    type: EDIT_FAMILY,
    family: family
  };
}
