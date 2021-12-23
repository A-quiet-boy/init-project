var merge = require('webpack-merge');
var common = require('./webpack.base.config');
var webpack = require('webpack');
var path = require('path');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
import DefaultConfig from '../src/config.default'
module.exports = merge(common, {
    mode: 'development',
    entry: ['./src/main'],
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                use: 'happypack/loader?id=babel',
                exclude: /node_modules/,
                include: path.resolve(__dirname, '../src')
            },
            {
                test: /\.(eot|ttf|svg|woff|woff2|doc|xlsx|xls|exe|zip)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        // outputPath: 'font/'
                        esModule: false
                    }
                }
            },
            {
                test: /\.(css|less)$/,
                exclude: path.resolve(__dirname, '../src'),
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            esModule: true
                        }
                    },
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.(less|css)$/,
                include: path.resolve(__dirname, '../src'),
                use: "happypack/loader?id=style"
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[name].[contenthash].[ext]'
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        new HappyPack({
            id: 'babel',
            verbose: false,
            loaders: [
                {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    }
                },
                {
                    loader: 'ts-loader',
                    options: {
                        happyPackMode: true
                    }
                }
            ],
            threadPool: happyThreadPool
        }),
        new HappyPack({
            id: 'style',
            verbose: false,
            loaders: [
                {
                    loader: 'style-loader',
                    options: {
                        esModule: true
                    }
                },
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            localIdentName: '[local]--[contenthash:base64:5]'
                        },
                    }
                },
                'postcss-loader',
                {
                    loader: 'less-loader',
                    options: {
                        javascriptEnabled: true
                    }
                }
            ],
            threadPool: happyThreadPool
        }),
        new webpack.DefinePlugin({
            BASE_URL: JSON.stringify(process.env.CROSSENV == 'test' ? DefaultConfig.request.prefix.test : DefaultConfig.request.prefix.prod)
        }),
    ],
    devtool: "source-map"
});