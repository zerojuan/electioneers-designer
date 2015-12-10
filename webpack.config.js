var path = require( 'path' );
var webpack = require( 'webpack' );

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    './src/scripts/router'
  ],
  devtool: 'eval',
  debug: true,
  output: {
    path: path.join( __dirname, 'public' ),
    filename: 'bundle.js'
  },
  resolveLoader: {
    modulesDirectories: [ 'node_modules' ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.coffee', '.less', '.ttf', '.eot', '.woff'],
    modulesDirectories:[
      'node_modules',
      'bower_components'
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/vertx/), // https://github.com/webpack/webpack/issues/353
    new webpack.ProvidePlugin({
      '_': 'underscore'
    }),

  ],

  externals:{
    'jquery': 'var jQuery',
    '$'     : 'var jQuery'
  },

  module: {
    loaders: [
      { test: /\.css$/, loaders: [ 'style', 'css' ]},
      { test: /\.less/, loader: 'style!css!less?outputStyle=expanded' },
      { test: /\.jsx$/, loaders: [ 'react-hot', 'babel-loader' ],
        query: {
            presets:['es2015', 'react']
        }},
      { test: /\.(jpg|png|gif|svg)/, loader: 'file-loader' },
      { test: /\.(eot|ttf|woff)/, loader: 'file-loader' }
    ]
  }
};
