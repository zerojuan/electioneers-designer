
const express = require( 'express' );
const cors = require( 'cors' );
const bodyParser = require( 'body-parser' );
const multer = require( 'multer' );

const app = express();

app.use( bodyParser.urlencoded({
  extended: true
}) );

app.use( bodyParser.json() );

app.use( multer().single( 'file' ) );
app.use( cors() );

app.use( '/base', require( './routes/designbase.js' ) );
app.use( '/image', require( './routes/images.js' ) );
app.use( '/graphics', require( './routes/graphics.js' ) );
app.use( '/', require( './routes/index.js' ) );



if ( require.main === module ) {
  const server = app.listen( 7171, function() {
    const host = server.address().address;
    const port = server.address().port;

    console.log( 'Example app listening at http://%s:%s', host, port );
  });
}

process.on( 'uncaughtException', function( err ) {
    if ( err.errno === 'EADDRINUSE' ) {
      return console.log( 'Error: ', err );
    } else {
      console.log( err );
    }

    // process.exit( 1 );
});

exports = module.exports = app;
