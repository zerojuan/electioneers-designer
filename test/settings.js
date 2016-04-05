const test = require( 'tape' );

const settings = require( '../server/settings.js' );

test( 'getWorkingDirectory', function( assert ) {
  const workingDirectory = settings.getWorkingDirectory();
  // should be a PartyAnimalsData folder
  assert.ok( /w*PartyAnimalsData\b/g.test( workingDirectory ),
    'Should end with \'PartyAnimalsData\'' );
  assert.end();
});
