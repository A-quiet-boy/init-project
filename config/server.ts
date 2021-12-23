let path = require('path');
let webpack = require('webpack');
let config = require('./webpack.dev.config');
let color = require('colors/safe')
const webpackDevServer = require('webpack-dev-server');
const http = require('http')
const complier = webpack(config);
import DefaultConfig from '../src/config.default'
let ip = require('ip')


let port = DefaultConfig.listen.port;
let hostStatus = DefaultConfig.listen.host == "0.0.0.0"
let host = DefaultConfig.listen.host == "0.0.0.0" ? ip.address() : DefaultConfig.listen.host
const options = {
    contentBase: path.join(__dirname, '../dist/'),
    hot: true,
    hotOnly: true,
    host: host,
    historyApiFallback: true,
    stats: 'errors-only',
    open: true
}
webpackDevServer.addDevServerEntrypoints(config, options);

const server = new webpackDevServer(complier, options);
server.use(require('webpack-hot-middleware')(complier, {
    reload: false
}));

const setupServer = (port: number) => {
    server.listen(port, options.host, (err: any) => {
        console.log(color.yellow("Available on:"))
        console.info("  http://127.0.0.1" + ':' + color.green(port))
        if (hostStatus) {
            console.info('  http://' + host + ':' + color.green(port))
        }
        if (err) {
            console.log(err)
            return;
        }
    })

}

const checkPort = () => {
    const httpServer = http.createServer().listen(port, options.host);

    httpServer.on('listening', function (event: any) {
        httpServer.close();
        setupServer(port)
    })

    httpServer.on('error', function (err: any) {
        if (err.code === 'EADDRINUSE') {
            port = port + 1;
            checkPort()
        }
    })
}

checkPort();