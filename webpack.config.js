
var isDeploy = isArgs('--deploy');

var path = require('path');
var webpack = require('webpack');

var commonPlagins = [
  new webpack.DefinePlugin({
    'ENV_isDeploy': JSON.stringify(isDeploy)
  })
];
var devPlagins = [
  new webpack.HotModuleReplacementPlugin(),
];
var deployPlagins = [
  new webpack.optimize.UglifyJsPlugin({ compress: {warnings: false} })
];

module.exports = {
  entry: [
    'webpack-dev-server/client',
    path.join(__dirname, '/src/main.js')
  ],
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },

  plugins: isDeploy ? commonPlagins.concat(deployPlagins) : commonPlagins.concat(devPlagins),

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

  //devtool: isDeploy ? null : 'eval',
};

function isArgs(str) {
  return (process.argv.indexOf(str) > -1);
}
