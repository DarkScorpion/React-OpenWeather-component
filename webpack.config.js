
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
  entry: setEntrySources([
    path.join(__dirname, '/src/main.js')
  ]),
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

function setEntrySources(sources) {
  if(!isDeploy) {
    switch(typeof sources) {
    case('object'):
      var tempObj = {};
      for(var key in sources) {
        tempObj[key] = setEntrySources(sources[key]);
      }
      return tempObj;
    case('array'):
      var tempArr = ['webpack-dev-server/client'];
      tempArr.concat(sources);
      return tempArr;
    case('string'):
      var tempArrStr = ['webpack-dev-server/client'];
      tempArrStr.push(sources);
      return tempArrStr;
    default:
      return sources;
    }
  }
  return sources;
}
