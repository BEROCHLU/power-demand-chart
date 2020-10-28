const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production', //production | development
    entry: './src/index.js',
    output: {
        filename: './middle.js',
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
            exclude: /node_modules/,
            use: ["style-loader",
                {
                    loader: "css-loader"
                }
            ]
        }]
    }
}