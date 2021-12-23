var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
var webpack = require('webpack');
const WebpackBar = require('webpackbar');
module.exports = {
    entry: {
        app: './src/main'
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
    },
    plugins: [
        new ReactRefreshWebpackPlugin({
            overlay: false,//不显示错误信息
        }),
        new WebpackBar(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html',
            inject: 'body',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            },
        }),
    ],
    stats: "none",
    resolve: {
        extensions: [".ts", ".tsx", ".js", "jsx", ".json", "css", "less", "scss"],
        alias: {
            "~": path.resolve(__dirname, '../src'),
            "~reducers": path.resolve(__dirname, '../src/reducers'),
            "~sagas": path.resolve(__dirname, '../src/sagas'),
            "~utils": path.resolve(__dirname, '../src/utils'),
            "~components": path.resolve(__dirname, '../src/components'),
            "~pages": path.resolve(__dirname, '../src/pages'),
            "~img": path.resolve(__dirname, '../src/assets/images'),
            "~js": path.resolve(__dirname, '../src/assets/js'),
            "~css": path.resolve(__dirname, '../src/assets/css'),
            "~assets": path.resolve(__dirname, '../src/assets'),
            "~apis": path.resolve(__dirname, '../src/apis'),
            "~routes": path.resolve(__dirname, '../src/routes'),
            "~store": path.resolve(__dirname, '../src/store')
        }
    },
}