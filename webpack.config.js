const path = require('path');
const webpack = require('webpack');

const config = {
    mode: 'production', //production | development
    entry: ['@babel/polyfill', './dev/src/native.js', './dev/src/jqtab.js'],
    output: {
        filename: './dev/build/[name].js',
        path: path.join(__dirname)
    },
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: 'initial',
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            _: 'lodash',
            echarts: 'echarts',
            dayjs: 'dayjs',
            isBetween: 'dayjs/plugin/isBetween.js',
            $: 'jquery',
            math: 'mathjs',
            crossfilter: 'crossfilter'
        })
    ],
    performance: {
        maxEntrypointSize: 16.0 * 1000000,
        maxAssetSize: 16.0 * 1000000
    },
    /*module: {
        rules: [{
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        }]
    },*/
    resolve: {
        alias: {
            'crossfilter': path.resolve(__dirname, './node_modules/crossfilter2/crossfilter.js')
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