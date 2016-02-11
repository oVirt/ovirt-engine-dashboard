var webpack = require('webpack')
var path = require('path')

const isDev = process.env.BUILD_DEV || false

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
    new webpack.DefinePlugin({
      '__DEV__': JSON.stringify(JSON.parse(isDev))
    })
  ]
}

if (!isDev) {
  config.devtool = 'source-map'
  config.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true
    })
  )
}
