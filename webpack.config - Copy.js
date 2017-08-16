var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [{
    entry: {
        student_app: './src/student_app/boot.ts',
        teacher_app: './src/teacher_app/boot.ts'
    },
    output: {
        filename: './app/[name]/bundle.js'
    },
    // Turn on sourcemaps
    devtool: '#source-map',
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.js', '.tsx', '.json']
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    target: 'web', // in order to ignore built-in modules like path, fs, etc.
    plugins: [
        new CopyWebpackPlugin([
            
            // Copy glob results, relative to context
            {
                context: './src',
                from: '**/*.html',
                to: './app'
            },
            
        ], {
            // By default, we only copy modified files during
            // a watch or webpack-dev-server build. Setting this
            // to `true` copies all files.
            copyUnmodified: true
        })
    ]
},

{
    entry: './src/css/app.scss',
    output: {
        path: path.resolve(__dirname, './app'),
        publicPath: '',
        filename: './css/bundle.css'
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                }),
                exclude: /node_modules/
            }
        ]
    },
  
    plugins: [
        new ExtractTextPlugin('./css/bundle.css')
    ],
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}
];