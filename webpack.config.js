const webpack = require('webpack');
const util = require('./build/util');
const config = require('./build/config');

const SERVER_PORT = config.SERVER_PORT;
const JS_DIR = config.JS_DIR;
const DIST_PATH = config.DIST_PATH;

module.exports = function (env) {
    const isProduction = (env === 'production');
    const moduleConfig = util.getModuleConfig(env, 'build');
    const mode = env;
    let r = {
        mode: mode,
        entry: util.getEntry(JS_DIR + '/entry/*.js'),
        output: {
            path: DIST_PATH,
            publicPath: isProduction ? config.productionPublicPath : config.developmentPublicPath,
            filename: '[name].js',
            chunkFilename: 'chunk.[name].js'
        },
        module: {
            rules: moduleConfig.rules
        },
        resolve: {
            alias: config.alias,
            extensions: ['.js', '.vue']
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                minChunks: 2,
                name: 'commons'
            }
        },
        plugins: [
            new webpack.ProvidePlugin(config.provide),
            new webpack.DllReferencePlugin({
                context: DIST_PATH,
                manifest: require('./build/dll-manifest.json'),
                name: 'dll'
            })
        ],
        devServer: {
            port: SERVER_PORT,
            host: '0.0.0.0',
            historyApiFallback: true,
            noInfo: false,
            disableHostCheck: true,
            contentBase: config.SERVER_DIR
        },
        devtool: false
    }
    r.plugins = r.plugins.concat(moduleConfig.extractPlugins);

    return r;
};



