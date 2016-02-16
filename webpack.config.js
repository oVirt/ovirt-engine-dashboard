var webpack = require('webpack')
var path = require('path')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

var config = module.exports = {
  entry: {
    plugin: './src/plugin.js',
    main_tab: './src/main_tab.jsx'
  },
  output: {
    path: __dirname + '/dist/dashboard-resources',
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(png|jpg|jpeg|gif|svg)$/,
      // inline base64 URLs for <= 8k images, direct URLs for the rest
      loader: 'url-loader?limit=8192'
    }, {
      test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
      loader: 'url-loader?mimetype=application/font-woff'
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
      loader: 'file-loader?name=[name].[ext]'
    }]
  },
  resolve: {
    alias: {
      // to prevent multiple reacts loaded from various dependencies
      'react': path.join(__dirname, 'node_modules', 'react')
    },
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      { from: 'static/dashboard.json', to: '../' },
      { from: 'static/html' },
      { from: 'static/css' },
      { from: 'static/fonts' }
    ]),
    new webpack.DefinePlugin({
      '__DEV__': JSON.stringify(isDev)
    })
  ]
}

if (isProd) {
  // emit source map for each generated chunk
  config.devtool = 'source-map'
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true
    })
  )
}
