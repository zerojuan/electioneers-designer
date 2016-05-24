const test = require( 'tape' );

import {
  deleteDistrict
} from '../../client/scripts/reducers/district';

import {
  DELETE_DISTRICT
} from '../../client/scripts/actions/district';

const districts = [ {
    _id: '1'
  }, {
    _id: '2'
  }
];

test( 'Delete District Reducer', function( t ) {

  let action = {
    type: DELETE_DISTRICT,
    district: {
      _id: '1'
    }
  };

  const result = deleteDistrict( districts, action );

  t.equal( result.length, 1, 'should return correct count' );
  t.end();

});
