const mock = require( 'mock-fs' );
const test = require( 'tape' );
const request = require( 'supertest' );

const app = require( '../../server/index.js' );
const settings = require( '../../server/settings.js' );

test( 'GET /images/:name/bg/:bgName', function( t ) {
  t.end();
});

test( 'GET /images/:name/d/:gfxName', function( t ) {
  t.end();
});

test( 'GET /images/:name', function( t ) {
  t.end();
});
