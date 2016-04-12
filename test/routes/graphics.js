const mock = require( 'mock-fs' );
const test = require( 'tape' );
const request = require( 'supertest' );

const app = require( '../../server/index.js' );
const settings = require( '../../server/settings.js' );

var mockFileSystem = {};
mockFileSystem[ '/sample' ] = {
  'upload': {
    'samplefile.png': 'xxxxx'
  }
};
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
    'rainbow-bg.png': 'content'
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

test( 'GET /', function( t ) {
  mock( mockFileSystem );
  request( app )
    .get( '/graphics/' )
    .expect( 200 )
    .expect( 'Content-Type', /json/ )
    .end(function( err, res ) {
      t.error( err, 'No error' );

      const result = res.body;
      t.equals( result.backgrounds.length, 2,
        'Returns 2 background objects' );
      t.equals( result.districts.length, 2,
        'Returns 2 district objects' );
      mock.restore();
      t.end();
    });
});

test( 'POST /graphics/', function( t ) {
  mock( mockFileSystem );
  request( app )
    .post( '/graphics/' )
    .field( 'graphics', JSON.stringify({
      'backgrounds': [ {
        'id': 'hey',
        'name': 'filename',
        'file': 'something.png'
      } ],
      'districts': [ {
        'id': 'hey2',
        'name': 'filename2',
        'file': 'thisisthedata.png'
      } ]
    }) )
    .expect( 200 )
    .end(function( err, res ) {
      t.error( err, 'No error' );

      const result = JSON.parse( res.body );
      t.equals( result.backgrounds.length, 1,
        'Returns correct number of backgrounds' );
      t.equals( result.districts.length, 1,
        'Returns correct number of districts' );
      t.equals( result.backgrounds[ 0 ].id, 'hey',
        'Correct background id' );
      mock.restore();
      t.end();
    });
});

test( 'POST /graphics/upload', function( t ) {
  mock( mockFileSystem );
  request( app )
    .post( '/graphics/upload' )
    .field( 'name', 'thisisname' )
    .field( 'type', 'districts' )
    .attach( 'file', '/sample/upload/samplefile.png' )
    .expect( 200 )
    .end(function( err, res ) {
      t.error( err, 'No error' );

      const result = res.body;
      t.equals( result.districts.length, 3,
        'Added new file in districts length' );
      t.equals( result.districts[ 2 ].name, 'thisisname',
        'Added correct district' );
      mock.restore();
      t.end();
    });
});

test( 'DELETE /graphics/', function( t ) {
  mock( mockFileSystem );
  request( app )
    .delete( '/graphics/' )
    .field( 'data', JSON.stringify({
      id: 'ocean'
    }) )
    .field( 'type', 'backgrounds' )
    .expect( 200 )
    .end(function( err, res ) {
      t.error( err, 'No error' );
      const result = res.body;
      t.equals( result.type, 'backgrounds', 'Should return correct type' );
      request( app )
        .get( '/graphics/' )
        .expect( 200 )
        .end(function( err, res ) {
          t.error( err, 'No error' );
          const result = res.body;
          t.equals( result.backgrounds.length, 1, 'Should delete from graphics' );
          mock.restore();
          t.end();
        });
    });
});
