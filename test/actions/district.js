const test = require( 'tape' );

import {
  deleteDistrict,
  DELETE_DISTRICT
} from '../../client/scripts/actions/district';

test( 'Delete District Action', function( t ) {
  const district = {
    _id: '1'
  };
  
  const result = deleteDistrict( district );

  t.equal( result.type, DELETE_DISTRICT, 'should return correct type' );
  t.equal( result.district, district, 'should return correct district' );
  t.end();

});
