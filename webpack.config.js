var path = require( 'path' );
var webpack = require( 'webpack' );

var phaserModule = path.join( __dirname, '/node_modules/phaser/' );
var phaser = path.join( phaserModule, 'build/custom/phaser-split.js' ),
  pixi = path.join( phaserModule, 'build/custom/pixi.js' ),
  p2 = path.join( phaserModule, 'build/custom/p2.js' );

module.exports = {
  devTool: 'eval',
  debug: true,
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/dev-server',
    './client/scripts/router'
  ],

  output: {
    filename: 'bundle.js',
    path: path.join( __dirname, 'app/out' )
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin( /vertx/ ),
    new webpack.ProvidePlugin({
      '_': 'lodash'
    })
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
