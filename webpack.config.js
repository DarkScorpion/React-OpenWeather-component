
var path = require('path');

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
      include: path.join(__dirname, "/src"),
      query: {
        presets: ['react', 'es2015']
      }
    }, {
      test: /\.styl?$/,
      loader: 'style!css!stylus',
    }]
  },
  plugins: []
};

console.log('Webpack start build!');
