const test = require( 'tape' );

const settings = require( '../server/settings.js' );

test( 'getWorkingDirectory', function( t ) {
  const workingDirectory = settings.getWorkingDirectory();
  // should be a ElectioneersData folder
  t.ok( /w*ElectioneersData\b/g.test( workingDirectory ),
    'Should end with \'ElectioneersData\'' );
  t.end();
});
