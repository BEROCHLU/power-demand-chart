const path = require('path');

const config = {
    mode: 'production', //production | development
    entry: ['./dev/src/native.js', './dev/src/jqtab.js'],
    output: {
        filename: './dist/build/[name].js',
        path: path.join(__dirname)
    },
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: 'initial',
        }
    },
    performance: {
        maxEntrypointSize: 16.0 * 1000000,
        maxAssetSize: 16.0 * 1000000
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /node_modules[\\\/]core-js/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                "targets": ["ie 11"],
                                "useBuiltIns": "entry",
                                "corejs": 3,
                                "debug": false
                            }
                        ]
                    ]
                }
            }
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