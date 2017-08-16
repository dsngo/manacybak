var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var importGlobLoader = require('import-glob-loader');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [
  {
    entry: {
      student_app: './src/student_app/boot.ts',
      teacher_app: './src/teacher_app/boot.ts',
    },
    output: {
      filename: './app/[name]/bundle.js',
    },
    devtool: 'cheap-module-eval-source-map',
    resolve: {
      extensions: ['.webpack.js', '.web.js', '.ts', '.js', '.tsx', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    target: 'web', // in order to ignore built-in modules like path, fs, etc.
    externals: [
      nodeExternals({
        importType: 'var',
        whitelist: [/^lodash/, /^rxjs/, /^setimmediate/, /^md-color-picker/,],
      }),
    ], // in order to ignore all modules in node_modules folder
    plugins: [
      new CopyWebpackPlugin(
        [
          {
            context: './src',
            from: '**/*.html',
            to: './app',
          },
        ],
        {
          copyUnmodified: true,
        }
      ),
    ],
  },
  {
    entry: {
      bundle: './src/css/app.scss',
    },
    output: {
      path: path.join(__dirname, 'app/css'),
      filename: '[name].css',
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader?sourceMap&importLoaders=1',
              'postcss-loader',
              'sass-loader',
            ],
          }),
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [new ExtractTextPlugin('[name].css')],
  },
];
