var path = require( 'path' );
var webpack = require( 'webpack' );

var phaserModule = path.join( __dirname, '/node_modules/phaser/' );
var phaser = path.join( phaserModule, 'build/custom/phaser-split.js' ),
  pixi = path.join( phaserModule, 'build/custom/pixi.js' ),
  p2 = path.join( phaserModule, 'build/custom/p2.js' );

module.exports = {
  devTool: 'source-map',
  entry: [
    './client/scripts/router'
  ],

  output: {
    filename: 'bundle.js',
    path: path.join( __dirname, 'public' )
  },

  plugins: [
    new webpack.DefinePlugin({
      // This has effect on the react lib size.
      'process.env': {
        NODE_ENV: JSON.stringify( 'production' )
      }
    }),
    new webpack.IgnorePlugin( /vertx/ ),
    new webpack.IgnorePlugin( /un~$/ ),
    new webpack.optimize.DedupePlugin()
  ],

  resolve: {
    alias: {
        'phaser': phaser,
        'pixi.js': pixi,
        'p2': p2
    },
    extensions: [ '', '.js', '.jsx', '.coffee', '.less', '.ttf', '.eot', '.woff' ],
    moduleDirectories: [
      'node_modules',
      'bower_components'
    ]
  },

  resolveLoader: {
    moduleDirectories: [ 'node_modules' ]
  },

  plugins: [
    new webpack.ContextReplacementPlugin( /moment[\/\\]locale$/, /de|fr|hu/ )
  ],

  module: {
    preloaders: [
      {
        test: /\.jsx?$/,
        loaders: [ 'eslint', 'jscs' ]
      }
    ],
    loaders: [
      {
        test: /(pixi.js|p2)/,
        loader: 'script'
      },
      {
        test: /\.css$/,
        loaders: [ 'style', 'css' ]
      },
      {
        test: /\.less/,
        loaders: [ 'style', 'css', 'less' ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [ 'react-hot', 'babel-loader' ]
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.(jpg|png|gif|svg)/,
        loader: 'file-loader'
      },
      {
        test: /\.(eot|ttf|woff)/,
        loader: 'file-loader'
      }
    ]
  }
};
