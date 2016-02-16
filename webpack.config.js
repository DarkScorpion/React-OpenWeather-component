
var path = require('path');

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
  }
};

console.log('Run Webpack!');
