var merge = require('webpack-merge');
var common = require('./webpack.base.config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
import DefaultConfig from '../src/config.default'
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

var webpack = require('webpack');
var path = require('path');
module.exports = merge(common, {
    mode: 'production',
    entry: {
        app: './src/main',
        framework: ['react', 'react-dom', 'react-router-dom']
    },
    output: {
        filename: 'js/[name].[chunkhash:10].bundle.js',
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require("cssnano"),
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }]
                },
                canPrint: true
            }),
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                terserOptions:{
                    compress: {
                        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
                    }
                }
            })
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 5000,
            maxSize: 0,
            minChunks: 1,
            cacheGroups: {
                framework: {
                    test: "framework",
                    name: "framework",
                    enforce: true
                },
                vendors: {
                    priority: -10,
                    test: /node_modules/,
                    name: "vendor",
                    enforce: true,
                },
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx|ts$/,
                loader: 'ts-loader',
                exclude: '/node_modules/',
                include: path.resolve(__dirname, '../src'),
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: path.resolve(__dirname, '../src'),
            },
            {
                test: /\.(eot|ttf|svg|woff|woff2|doc|xlsx|xls|exe|zip)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        limit: 1000,
                        // outputPath: 'font/'
                        esModule: false
                    }
                }
            },
            {
                test: /\.(css|less)$/,
                exclude: path.resolve(__dirname, '../src'),
                use: [
                    MiniCssExtractPlugin.loader,
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
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name][contentHash:base64:5]'
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
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1000,
                            name: '[name].[contentHash].[ext]'
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            BASE_URL: JSON.stringify(process.env.CROSSENV == "test" ? DefaultConfig.request.prefix.test : DefaultConfig.request.prefix.prod)
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name][contenthash].css',
            chunkFilename: 'css/[id][contenthash].css',
        })
    ],
    stats: {
        children: false
    },
    performance: {
        hints: false
    }
});