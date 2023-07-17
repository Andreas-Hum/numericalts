const path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './index.ts', // This can be any file name within the src directory
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
        ],
    },
    mode: 'production',
};