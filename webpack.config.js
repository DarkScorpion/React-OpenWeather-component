
var isDeploy = inArgs('--deploy');

var path = require('path');
var webpack = require('webpack');

var devPlagins = [
  new webpack.DefinePlugin({
    'ENV_isDeploy': JSON.stringify(isDeploy)
  })
];
var deployPlagins = [
  new webpack.optimize.UglifyJsPlugin({ compress: {warnings: false} })
];

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

  plugins: isDeploy ? devPlagins.concat(deployPlagins) : devPlagins,
  devtool: isDeploy ? null : 'eval'
};

function inArgs(str) {
  return (process.argv.indexOf(str) > -1);
}
