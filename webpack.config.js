const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const DEPS = Object.keys(require('./package.json').dependencies);
const NODE_ENV = process.env.NODE_ENV;
const SRC_PATH = path.join(__dirname, './src');
const DIST_PATH = path.join(__dirname, './dist');
const BOWER_PATH = path.resolve(__dirname, 'bower_components');
const NODE_PATH = path.resolve(__dirname, 'node_modules');
const APPNAME = 'Help John';
const ENV = {
    production: NODE_ENV === 'production',
    staging: NODE_ENV === 'staging',
    test: NODE_ENV === 'test',
    development: NODE_ENV === 'development' || typeof NODE_ENV === 'undefined'
};

Object.assign(ENV, {build: (ENV.production || ENV.staging)});

module.exports = {
    target: 'web',
    devtool: ENV.development ? 'eval' : 'source-map',
    context: SRC_PATH,
    entry: {
        vendors: DEPS,
        app: ['babel-polyfill', './index.js']
    },
    output: {
        path: DIST_PATH,
        publicPath: '/',
        filename: 'js/[chunkhash].[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    "latest",
                                    {
                                        "es2015": {
                                            "modules": false
                                        }
                                    }
                                ],
                                "react",
                                "stage-2"
                            ]
                        }
                    }
                ],
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(jpg|png)$/,
                loader: 'file-loader',
                query: {
                    name: 'images/[hash].[name].[ext]'
                }
            },
            {
                test: /\.scss/,
                loader: ENV.development ? [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'sass-loader'}] :
                    ExtractTextPlugin.extract({
                        notExtractLoader: 'style-loader',
                        loader: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true,
                                    minimize: true,
                                    safe: true
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true
                                }
                            }]
                    })
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader',
                query: {
                    name: 'fonts/[hash].[name].[ext]'
                }
            },
            {
                test: /config\/(config|version)\.js$/,
                loader: 'file-loader',
                query: {
                    name: 'js/[name].[ext]'
                }
            }
        ],
        noParse: /\.min\.js/
    },
    resolve: {
        modules: [NODE_PATH, BOWER_PATH, SRC_PATH]
    },
    devServer: {
        contentBase: DIST_PATH,
        historyApiFallback: true,
        port: 8001,
        compress: ENV.production || ENV.staging,
        inline: ENV.development
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/[hash].[name].css',
            disable: ENV.development
        }),
        new FaviconsWebpackPlugin({
            logo: path.join(__dirname, 'favicon.png'),
            prefix: 'favicons-[hash]/',
            persistentCache: true,
            inject: true,
            title: APPNAME
        }),
        new HtmlWebpackPlugin({
            title: APPNAME,
            filename: 'index.html',
            template: 'index.ejs',
            cache: ENV.development
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendors', 'manifest'],
            filename: 'js/[hash].[name].js',
            minChunks: Infinity
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': typeof NODE_ENV === 'undefined' ? JSON.stringify('development') : JSON.stringify(NODE_ENV)
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        })
    ]
};