'use strict'

const webpackConfig = require('./webpack.config')

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha'],
    files: [
      './node_modules/babel-polyfill/dist/polyfill.js',
      'src/test-index.js'
    ],
    preprocessors: {
      'src/test-index.js': ['webpack', 'sourcemap']
    },
    plugins: [
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher'
    ],
    reporters: ['mocha'],
    logLevel: config.LOG_INFO,
    webpack: webpackConfig
  })
}
