const mock = require( 'mock-fs' );
const test = require( 'tape' );
const request = require( 'supertest' );

const app = require( '../../server/index.js' );
const settings = require( '../../server/settings.js' );
const mockFileSystem = {};
mockFileSystem[ settings.getWorkingDirectory() ] = {
  'districts.json': '{}',
  'population.json': '{}',
  'actions.json': '{}',
  'config.json': '{}',
  'saves': {
    'sample-scenario': {
      'districts.json': JSON.stringify({ data: [] }),
      'population.json': JSON.stringify({ data: [] }),
      'actions.json': JSON.stringify({ data: [] }),
      'config.json': JSON.stringify({ data: [] })
    }
  }
};

test( 'GET /base/:name', function( t ) {
  mock( mockFileSystem );
  request( app )
    .get( '/base/sample-scenario' )
    .expect( 200 )
    .expect( 'Content-Type', /json/ )
    .end(function( err, res ) {
      t.error( err, 'No error' );
      var result = res.body;
      // verify shape
      t.ok( result.population, 'has population' );
      t.ok( result.actions, 'has actions' );
      t.ok( result.config, 'has config' );
      t.ok( result.districts, 'has districts' );
      mock.restore();
      t.end();
    });
});

test( 'GET 404 /base/:name', function( t ) {
  mock( mockFileSystem );
  request( app )
    .get( '/base/new-scenario' )
    .expect( 404 )
    .end(function( err, res ) {
      t.error( err, 'results to 404' );
      mock.restore();
      t.end();
    });
});

test( 'POST /base/:name', function( t ) {
  mock( mockFileSystem );
  request( app )
    .post( '/base/new-scenario' )
    .expect( 200 )
    .expect( 'Content-Type', /json/ )
    .end(function( err, res ) {
      t.error( err, 'No error' );
      var result = res.body;
      t.equals( result.name, 'new-scenario', 'Correct name' );
      mock.restore();
      t.end();
    });
});

test( 'DELETE /base/:name', function( t ) {
  mock( mockFileSystem );
  request( app )
    .delete( '/base/sample-scenario' )
    .expect( 200 )
    .expect( 'Content-Type', /json/ )
    .end(function( err, res ) {
      t.error( err, 'No error' );
      var result = res.body;
      t.equals( result.name, 'sample-scenario', 'Correct name' );
      request( app )
        .get( '/base/sample-scenario' )
        .expect( 404 )
        .end(function( err, res ) {
          t.error( err, 'return 404 when getting' );
          mock.restore();
          t.end();
        });
    });
});
