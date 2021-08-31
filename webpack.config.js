const path = require('path');
const webpack = require('webpack');

const config = {
    mode: 'production', //production | development
    entry: ['@babel/polyfill', './src/native.js', './src/jqtab.js'],
    output: {
        filename: './dist/wpack.js',
        path: path.join(__dirname)
    },
    plugins: [
        new webpack.ProvidePlugin({
            _: 'lodash',
            echarts: 'echarts',
            dayjs: 'dayjs',
            isBetween: 'dayjs/plugin/isBetween.js',
            $: 'jquery',
            math: 'mathjs'
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
    },
    resolve: {
        alias: {
            'crossfilter': path.resolve(__dirname, './node_modules/crossfilter2/crossfilter.min.js')
        }
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