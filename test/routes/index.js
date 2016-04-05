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

test( 'GET /', function( t ) {
  mock( mockFileSystem );
  request( app )
    .get( '/' )
    .expect( 200 )
    .expect( 'Content-Type', /json/ )
    .end(function( err, res ) {
      t.error( err, 'No error' );
      t.equals( res.body.length, 1, 'Has exactly one file in saved folder' );
      mock.restore();
      t.end();
    });
});

test( 'POST /add', function( t ) {
  mock( mockFileSystem );
  request( app )
    .post( '/add' )
    .expect( 200 )
    .expect( 'Content-Type', /json/ )
    .end(function( err, res ) {
      const result = res.body;
      t.ok( result.name, 'Response has a name' );
      t.ok( result.lastModified, 'Response has a lastModified' );
      mock.restore();
      t.end();
    });
});
