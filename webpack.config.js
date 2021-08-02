const path = require('path');
const webpack = require('webpack');

const config = {
    mode: 'production', //production | development
    entry: './src/index.js',
    output: {
        filename: './dist/wpack.js',
        path: path.join(__dirname)
    },
    plugins: [
        new webpack.ProvidePlugin({
            _: 'lodash',
            echarts: 'echarts'
        })
    ],
    performance: {
        maxEntrypointSize: 16.0 * 1000000,
        maxAssetSize: 16.0 * 1000000
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        }]
    }
}

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.mode = 'development';
        config.devtool = 'cheap-source-map';
    }
    console.log(config);
    return config;
}