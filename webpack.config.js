const webpack = require('webpack');
const path = require('path');

const UglifyJsPlugin = require('./dev/webpack/UglifyJsPlugin');

const ENV = process.env.NODE_ENV || 'development';

console.error(`
  ENV ${ENV}
`);

function getPlugins () {
  let plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'xin',
      filename: ENV === 'production' ? 'xin.min.js' : 'xin.js',
    }),
  ];

  if (ENV === 'production') {
    plugins.push(
      new UglifyJsPlugin({ compress: { warnings: false } })
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
        loader: [
          require.resolve('style-loader'),
          require.resolve('css-loader'),
        ],
      },
      {
        test: /\.js$/,
        include: /(ion-\w+\.js|\/(xin|template-binding)\/)/,
        loader: require.resolve('babel-loader'),
        query: {
          plugins: [
            // require.resolve('babel-plugin-transform-es2015-modules-commonjs'),
            require.resolve('babel-plugin-transform-async-to-generator'),
          ],
          // presets: ['es2015', 'stage-3'],
          cacheDirectory: true,
        },
      },
    ],
  },
};
