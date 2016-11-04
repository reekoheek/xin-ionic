const webpack = require('webpack');
const path = require('path');

const ENV = process.env.NODE_ENV || 'development';
const ANALYZE = process.env.ANALYZE || false;

console.info(`
  ENV ${ENV}
  ANALYZE ${ANALYZE}
`);

function getPlugins () {
  let plugins = [
    new webpack.optimize.CommonsChunkPlugin('xin', ENV === 'production' ? 'xin.min.js' : 'xin.js'),
  ];

  if (ENV === 'production') {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
      new webpack.optimize.DedupePlugin()
    );
  }

  return plugins;
}

module.exports = {
  entry: {
    'ion-app': './ion-app.js',
    'ion-button': './ion-button.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: ENV === 'production' ? '[name].min.js' : '[name].js',
  },
  devtool: 'source-map',
  plugins: getPlugins(),
  module: {
    loaders: [
      {
        test: /\.css$/,
        include: /\/(css|node_modules\/xin)\//,
        loader: 'style!css',
      },
      {
        test: /\.js$/,
        include: /(ion-\w+\.js|node_modules\/(xin|template-binding)\/)/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
        },
      },
    ],
  },
};
