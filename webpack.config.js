const path = require('path')

const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

const projectDir = path.resolve(__dirname)
const appDir = path.join(projectDir, 'app')
const mainAppEntryPoint = path.join(appDir, 'appMain.lsc')
const ISDEV = process.env.NODE_ENV !== 'production'
const IS_BUILD_DEBUG = !!process.env.IS_BUILD_DEBUG

console.log('ISDEV: ', ISDEV)
console.log('IS_BUILD_DEBUG: ', IS_BUILD_DEBUG)
console.log('process.env.NODE_ENV: ', process.env.NODE_ENV)

const webpackOptions = {
  mode: process.env.NODE_ENV,
  target: 'node',
  entry: mainAppEntryPoint,
  output: {
    filename: 'appMain-compiled.js',
    path: projectDir
  },
  externals: [nodeExternals()],
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false
  },
  devtool: ISDEV ? 'source-map' : 'none',
  context: projectDir,
  module: {
    rules: [
      {
        test: /.lsc/,
        exclude: [
          /(node_modules)/
        ],
        loader: 'babel-loader',
        options: {
          sourceMap: ISDEV
        }
      },
    ]
  },
  resolve: {
    extensions: ['.lsc', '.js']
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new webpack.DefinePlugin({ ISDEV, IS_BUILD_DEBUG }),
  ]
}

module.exports = webpackOptions
