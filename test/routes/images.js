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
  'saves': {
    'something': {
      'districts.json': 'thisisthevalue'
    }
  },
  'gfx': {
    'rainbow-bg.png': 'thisisafile',
    'shatterworlds.jpg': 'thisisshatterworlds',
    'district-a.png': 'thisisdistricta',
    'rem_0014.png': 'rem_0014data'
  },
  'graphics.json': JSON.stringify({
    'backgrounds': [
      {
        'id': 'ocean',
        'name': 'Rainbow',
        'file': 'rainbow-bg.png'
      },
      {
        'id': 'shattered',
        'name': 'ShatteredWorlds',
        'file': 'shatteredworlds.jpg'
      }
    ],
    'districts': [
      {
        'id': 'district-a',
        'name': 'Simple Image',
        'file': 'district-a.png'
      },
      {
        'id': 'district-b',
        'name': 'Isometric',
        'file': 'rem_0014.png'
      }
    ]
  })
};

test( 'GET /image/:name/bg/:bgName', function( t ) {
  mock( mockFileSystem );
  request( app )
    .get( '/image/ourscenario/bg/ocean' )
    .expect( 200 )
    .expect( 'Content-Type', /image/ )
    .end(function( err, res ) {
      t.error( err, 'No error' );
      // missing files should still return an image
      request( app )
        .get( '/image/ourscenario/bg/somethingelese' )
        .expect( 200 )
        .end(function( err, res ) {
          t.error( err, 'No error' );
          mock.restore();
          t.end();
        });
    });
});

test( 'GET /image/:name/d/:gfxName', function( t ) {
  mock( mockFileSystem );
  request( app )
    .get( '/image/ourscenario/d/district-a' )
    .expect( 200 )
    .expect( 'Content-Type', /image/ )
    .end(function( err, res ) {
      t.error( err, 'No error' );
      // missing files should still return an image
      request( app )
        .get( '/image/ourscenario/d/district-c' )
        .expect( 200 )
        .end(function( err, res ) {
          t.error( err, 'No error' );
          mock.restore();
          t.end();
        });
    });
});

test( 'GET /image/:name', function( t ) {
  mock( mockFileSystem );
  request( app )
    .get( '/image/district-a.png' )
    .expect( 200 )
    .expect( 'Content-Type', /image/ )
    .end(function( err, res ) {
      t.error( err, 'No error' );
      mock.restore();
      t.end();
    });
});

test( 'GET 404 /image/:name', function( t ) {
  mock( mockFileSystem );
  request( app )
    .get( '/image/district-x.png' )
    .expect( 404 )
    .end(function( err, res ) {
      t.error( err, 'expect a 404' );
      mock.restore();
      t.end();
    });
});
