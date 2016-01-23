import fetch from 'isomorphic-fetch';

export const BATCH_GENERATE_FAMILY = 'BATCH_GENERATE_FAMILY';


export function batchGenerateFamily({ count, wealth }) {
  return {
    type: BATCH_GENERATE_FAMILY,
    count: count,
    wealth: wealth
  };
}
