var path = require("path");
var webpack = require('webpack');
var PORT = process.env.PORT || 3003;

module.exports = {
  devtool: 'inline-source-map',
  entry: "./src/index.js",
  context: path.resolve(process.cwd(), "examples"),
  output: {
    path: 'examples/.tmp',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader?{"stage" : 0}'],
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loaders: ['html-loader'],
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    root: [path.join(process.cwd(), 'examples')],
    alias: {'redux-form-validation': path.join(process.cwd(), 'src/index.js')},
    extensions: ['', '.js', '.jsx', '.es6', '.scss', '.css'],
    modulesDirectories: [
      'examples',
      'node_modules',
    ],
  },
  devServer: {
    contentBase: 'examples',
    noInfo: false, //  --no-info option
    historyApiFallback: true,
    progress: true,
    hot: true,
    inline: true,
    port: PORT,
  },
};