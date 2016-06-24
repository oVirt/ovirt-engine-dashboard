'use strict'

const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const env = process.env.NODE_ENV || 'development'
const isProd = env === 'production'
const isDev = env === 'development'
const isTest = env === 'test'

// additional build options
const extractMessages = process.env.EXTRACT_MESSAGES === '1'

// additional options passed to Babel transpiler
const babelOptions = {
  plugins: []
}

// start with common webpack configuration applicable to all environments
const config = module.exports = {
  module: {
    loaders: [
      {
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
        loader: 'style!css'
      }, {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        // inline base64 URLs for <= 8k images, direct URLs for the rest
        loader: 'url?limit=8192'
      }, {
        test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
        loader: 'url?mimetype=application/font-woff'
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
        loader: 'file?name=[name].[ext]'
      }
    ]
  },
  resolve: {
    alias: {
      // prevent multiple reacts loaded from various dependencies
      'react': path.join(__dirname, 'node_modules', 'react')
    },
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.ProvidePlugin({
      // Bootstrap's JavaScript implicitly requires jQuery global
      jQuery: 'jquery'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env)
      },
      '__DEV__': JSON.stringify(isDev)
    })
  ]
}

// common development and production build configuration
if (isDev || isProd) {
  config.entry = {
    'plugin': './src/plugin.js',
    'main-tab': './src/main-tab.jsx'
  }
  config.output = {
    filename: '[name].js',
    path: `${__dirname}/dist/dashboard-resources`,
    publicPath: '/'
  }
  config.plugins.push(
    new CleanWebpackPlugin(['dist', 'extra']),
    new CopyWebpackPlugin([
      { from: 'static/dashboard.json', to: '../' },
      { from: 'static/html' },
      { from: 'static/css' },
      { from: 'static/fonts' }
    ])
  )
}

// production specific build configuration
if (isProd) {
  // emit source map for each generated chunk
  config.devtool = 'source-map'
  config.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        // suppress warnings when dropping unreachable code, unused declarations etc.
        warnings: false
      }
    })
  )
}

// test specific build configuration
if (isTest) {
  // inline source map into generated JavaScript
  config.devtool = 'inline-source-map'
}

// TODO(vs) extracting English texts out of JavaScript should not require webpack build
if (extractMessages) {
  babelOptions.plugins.push(
    ['react-intl', {
      messagesDir: './extra/messages',
      enforceDescriptions: true
    }]
  )
}
