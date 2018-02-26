const webpack = require('webpack');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'client');

module.exports = {
  devServer: {
    // contentBase: './public',
    // hot: true
    inline: true,
    port: 3000
  },
  entry: SRC_DIR + '/app/index.js',
  output: {
    path: DIST_DIR + 'app',
    // path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/app/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /node_modules(\/|\\)(?!(@feathersjs))/],
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react', 'stage-0'],
          plugins: ["transform-decorators-legacy"]
        }
      },
      {
        test: /\.jsx?$/,
        use: 'react-hot-loader/webpack'
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ]
}