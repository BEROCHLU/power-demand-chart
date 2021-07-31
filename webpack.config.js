const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development', //production | development
    entry: './src/native.js',
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
            use: ["style-loader",
                {
                    loader: "css-loader"
                }
            ]
        }]
    },
    devtool: 'inline-source-map'
}