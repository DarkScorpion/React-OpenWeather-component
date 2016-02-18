
var path = require('path');
//var webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, '/src/main.js'),
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015']
      }
    }, {
      test: /\.css?$/,
      loader: 'style!css',
    }]
  },
  plugins: [
    //new webpack.optimize.UglifyJsPlugin({ compress: {warnings: false} })
  ]
};

console.log('Webpack start build!');
