const mock = require( 'mock-fs' );
const test = require( 'tape' );
const request = require( 'supertest' );

const app = require( '../../server/index.js' );
const settings = require( '../../server/settings.js' );

var mockFileSystem = {};
mockFileSystem[ settings.getWorkingDirectory() ] = {
  'districts.json': '{}',
  'population.json': '{}',
  'actions.json': '{}',
  'saves': {
    'something': {
      'districts.json': 'thisisthevalue'
    }
  }
};

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

test( 'POST /add', function( assert ) {
  mock( mockFileSystem );
  request( app )
    .post( '/add' )
    .expect( 200 )
    .expect( 'Content-Type', /json/ )
    .end(function( err, res ) {
      const result = res.body;
      assert.ok( result.name, 'Response has a name' );
      assert.ok( result.lastModified, 'Response has a lastModified' );
      mock.restore();
      assert.end();
    });
});
