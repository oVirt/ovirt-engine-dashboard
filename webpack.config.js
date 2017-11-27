'use strict'

const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
  bail: true,

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)|(zanata)/,
        loader: 'babel',
        query: babelOptions
      }, {
        test: /\.json$/,
        exclude: /(node_modules)|(zanata)/,
        loader: 'json'
      }, {
        test: /\.css$/,
        include: /(node_modules)|(static\/css)/,
        loader: isProd ? ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap') : 'style!css'
      }, {
        test: /\.css$/,
        exclude: /(node_modules)|(static\/css)/,
        loader: 'style!css'
      },

      // inline base64 URLs for <= 8k images, direct URLs for the rest
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 8192,
          name: 'media/[name].[hash:8].[ext]'
        }
      },

      // pack fonts - /woff2?/ gets embedded, the rest are copied
      {
        test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
        loader: 'url?mimetype=application/font-woff'
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
        loader: 'file?name=media/[name].[hash:8].[ext]'
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
  resolveLoader: {
    // lets loaders work on css referenced in npm modules
    root: path.resolve(__dirname, 'node_modules')
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
    // TODO(vs) use CommonsChunkPlugin to extract common vendor libs into separate chunk
    // https://webpack.github.io/docs/code-splitting.html#split-app-and-vendor-code
    'plugin': ['babel-polyfill', './src/plugin.js'],
    'main-tab': ['babel-polyfill', './src/main-tab.jsx']
  }
  config.output = {
    filename: '[name].js',
    path: `${__dirname}/dist/dashboard-resources`,
    publicPath: '/ovirt-engine/webadmin/plugin/dashboard/'
  }
  config.plugins.push(
    new CleanWebpackPlugin(['dist', 'extra']),
    new CopyWebpackPlugin([
      { from: 'static/dashboard.json', to: '../' }
    ]),
    new HtmlWebpackPlugin({
      filename: 'main-tab.html',
      template: 'static/html/main-tab.template.html',
      inject: true,
      chunks: ['main-tab']
    }),
    new HtmlWebpackPlugin({
      filename: 'plugin.html',
      template: 'static/html/plugin.template.html',
      inject: true,
      chunks: ['plugin']
    })
  )
}

// production specific build configuration
if (isProd) {
  // emit source map for each generated chunk
  config.devtool = 'source-map'

  // hash the output filenames
  config.output.filename = 'js/[name].[chunkhash:8].js'
  config.output.chunkFilename = 'js/[name].[chunkhash:8].chunk.js'

  config.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        // suppress warnings when dropping unreachable code, unused declarations etc.
        warnings: false
      }
    }),
    new ExtractTextPlugin('css/[name].[contenthash:8].css')
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
