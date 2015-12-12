var path = require( 'path' );
var webpack = require( 'webpack' );

module.exports = {
  devTool: 'eval',
  debug: true,
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    './src/scripts/router.jsx'
  ],

  output: {
    filename: 'bundle.js',
    path: path.join( __dirname, 'public' )
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      "_": "underscore"
    })
  ],

  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loaders: [ 'react-hot', 'babel-loader' ]
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      }
    ]
  }
};
