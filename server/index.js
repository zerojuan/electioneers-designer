var express = require('express');
var cors = require( 'cors' );
var app = express();

app.use( cors() );

app.get('/', function (req, res) {
  res.send('Hello World! WTF');
});

var server = app.listen(7171, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

process.on('uncaughtException', function(err) {
    if(err.errno === 'EADDRINUSE')
         return console.log('Error: ', err );
    else
         console.log(err);
    process.exit(1);
});
