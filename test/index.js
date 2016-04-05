const mock = require( 'mock-fs' );
const test = require( 'tape' );
const request = require( 'supertest' );

const app = require( '../server/index.js' );





const settings = require( '../server/settings.js' );
var mockFileSystem = {};
mockFileSystem[ settings.getWorkingDirectory() ] = {
  'saves': {
    'something': {
      'districts.json': 'thisisthevalue'
    }
  }
};


require( './settings.js' );

test( 'GET /', function( assert ) {
  mock( mockFileSystem );
  request( app )
    .get( '/' )
    .expect( 200 )
    .expect( 'Content-Type', /json/ )
    .end(function( err, res ) {
      console.log( res.body );
      assert.error( err, 'No error' );
      assert.equals( res.body.length, 1, 'Has exactly one file in saved folder' );
      mock.restore();
      assert.end();
    });
});
