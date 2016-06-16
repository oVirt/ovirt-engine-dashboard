'use strict'

const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// production vs. development switch
const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

// additional build options
const extractMessages = process.env.EXTRACT_MESSAGES === '1'

// options passed to Babel transpiler
const babelOptions = {
  presets: ['es2015', 'react'],
  plugins: []
}

const config = module.exports = {
  entry: {
    'plugin': './src/plugin.js',
    'main-tab': './src/main-tab.jsx'
  },
  output: {
    filename: '[name].js',
    path: `${__dirname}/dist/dashboard-resources`,
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: babelOptions
    }, {
      test: /\.json$/,
      exclude: /node_modules/,
      loader: 'json'
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
      // prevent multiple reacts loaded from various dependencies
      'react': path.join(__dirname, 'node_modules', 'react')
    },
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new CleanWebpackPlugin(['dist', 'extra']),
    new CopyWebpackPlugin([
      { from: 'static/dashboard.json', to: '../' },
      { from: 'static/html' },
      { from: 'static/css' },
      { from: 'static/fonts' }
    ]),
    new webpack.ProvidePlugin({
      // Bootstrap's JavaScript implicitly requires jQuery global
      jQuery: 'jquery'
    }),
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

if (extractMessages) {
  babelOptions.plugins.push(
    ['react-intl', {
      messagesDir: './extra/messages',
      enforceDescriptions: true
    }]
  )
}
