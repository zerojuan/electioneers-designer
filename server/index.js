'use strict';

const express = require( 'express' );
const cors = require( 'cors' );

const app = express();

app.use( cors() );

app.use( '/', require( './routes/index.js' ) );


const server = app.listen( 7171, function() {
  const host = server.address().address;
  const port = server.address().port;

  console.log( 'Example app listening at http://%s:%s', host, port );
});

process.on( 'uncaughtException', function( err ) {
    if ( err.errno === 'EADDRINUSE' ) {
      return console.log( 'Error: ', err );
    } else {
      console.log( err );
    }

    process.exit( 1 );
});
