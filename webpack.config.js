
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, '/src/main.jsx'),
  output: {
    path: path.join(__dirname),
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015']
      }
    }]
  },
  plugins: [
    //new webpack.optimize.UglifyJsPlugin({ compress: {warnings: false} })
  ]
};

console.log('Run Webpack!');
