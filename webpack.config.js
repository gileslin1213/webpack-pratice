const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV,
    context: path.resolve(__dirname, 'src'),
    entry: {
        "index": "./index.js",
        "someThing": "./someThing.js"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './js/[name].[contenthash:8].js',
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                }]
            },
            {
                test: /\.(js)$/,
                use: 'babel-loader'
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "./css/[name].[contenthash:8].css",
        }),
        new HtmlWebpackPlugin({
            title:'index',
            filename:'index.html',
            template:'html/index.html',
            chunks:['index']
        }),
        new HtmlWebpackPlugin({
            title:'something',
            filename:'someThing.html',
            template:'html/index.html',
            chunks:['someThing']
        }),
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
    },
}