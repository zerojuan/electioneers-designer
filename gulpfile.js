'use strict';

var gulp = require('gulp');
var gutil = require( 'gulp-util' );
var watch = require('gulp-watch');
var less = require('gulp-less');
var webpack = require( 'webpack' );
var WebpackDevServer = require( 'webpack-dev-server' );
var webpackConfig = require( './webpack.config.js' );
// var webpackProductionConfig = require( './webpack.production.config.js' );

var map = require( 'map-stream' );
var touch = require( 'touch' );

var $ = require( 'gulp-load-plugins' )();

gulp.task( 'css', function() {
  gulp.src([
    'src/styles/*.less',
    'src/styles/*.less'
  ]).on( 'error', function( err ) {
    gutil.log( err );
  })
  .pipe( gulp.dest( 'public/' ))
  .pipe( map( function( a, cb ) {
    if ( devServer.invalidate ) {
      devServer.invalidate();
    }
    cb();
  }));
});

gulp.task( 'copy-assets', function() {
  gulp.src( 'assets/**' )
    .pipe( gulp.dest( 'public' ));
});

var devCompiler = webpack( webpackConfig );
gulp.task( 'webpack:build-dev', [ 'css' ], function( callback ) {
  devCompiler.run(function( err, stats ) {
    if ( err ) {
      throw new gutil.PluginError( 'webpack:build-dev', err );
    }

    gutil.log( 'webpack:build-dev', stats.toString( true ));

    return callback();
  });
});

var devServer = {};
gulp.task( 'webpack-dev-server', [ 'css' ], function( callback ) {
  // ensure there's a public main.css
  touch.sync( './public/main.css', new Date());

  devServer = new WebpackDevServer( webpack(webpackConfig), {
    contentBase: './public',
    hot: true,
    watchOptions: {
      aggregateTimeout: 100
    },
    inline: true,
    noInfo: true
  });
  devServer.listen( 8080, '0.0.0.0', function( err ) {
    if ( err ) {
      throw new gutil.PluginError( 'webpack-dev-server', err );
    }
    gutil.log( '[webpack-dev-server]', 'http://localhost:8080' );
    return callback();
  });

});

gulp.task( 'default', function() {
  gulp.start( 'build' );
});

gulp.task( 'build', [ 'webpack:build', 'copy-assets' ]);

gulp.task( 'watch', [ 'css', 'copy-assets', 'webpack-dev-server' ], function(){
  gulp.watch( [ 'src/styles/**' ], [ 'css' ]);
  gulp.watch( [ 'assets/**' ], [ 'copy-assets' ]);
});
