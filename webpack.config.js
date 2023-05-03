// eslint-disable-next-line no-undef
let path = require('path');
const {VueLoaderPlugin} = require("vue-loader");

// eslint-disable-next-line no-undef
let projectRootDir = process.cwd();
let sourceFolder = 'src';
let outputFolder = 'app';
let outputFileName = 'extension.js';

// eslint-disable-next-line no-undef
module.exports = (mode = 'production') => ({
  entry: path.join(projectRootDir, sourceFolder, 'main.js'),
  output: {
    filename: 'js/' + outputFileName,
    chunkFilename: 'js/[name].js',
    path: path.join(projectRootDir, outputFolder),
    publicPath: './'
  },
  mode: mode,
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [
            // eslint-disable-next-line no-undef
            [require.resolve('babel-preset-env'), { modules: false }],
            // eslint-disable-next-line no-undef
            require.resolve('babel-preset-react')
          ],
          cacheDirectory: true
        },
        include: path.join(projectRootDir, sourceFolder)
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$/,
        use: ['url-loader?limit=1000&name=./img/[name].[ext]']
      },
      {
        test: /\.woff2|\.woff$|\.ttf$|\.eot$/,
        use: ['url-loader?limit=1000&name=./fonts/[name].[ext]']
      },
      {
        test: /\.svg$/,
        use: ['url-loader?limit=1&name=./fonts/[name].[ext]']
      }
    ]
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin()
  ]
});
