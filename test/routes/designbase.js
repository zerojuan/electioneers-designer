const mock = require( 'mock-fs' );
const test = require( 'tape' );
const request = require( 'supertest' );

const app = require( '../../server/index.js' );
const settings = require( '../../server/settings.js' );

test( 'GET /base/:name', function( t ) {
  t.end();
});

test( 'POST /base/:name', function( t ) {
  t.end();
});

test( 'DELETE /base/:name', function( t ) {
  t.end();
});
