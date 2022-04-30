const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },
            {
                test: /\.css$/i,
                exclude: /styles.css$/, // Se coloca el exclude porque si se ejecuta
                // este test, no va a ejecutar el test: '/styles.css$/'
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser(),
        ]
    },
    output: {
        clean: true,
        filename: 'main.[contenthash].js'

    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html', // Se puede cambiar el nombre del archivo.
            template: './src/index.html',
            title: 'iiifilomena App',
        }),
        new MiniCssExtractPlugin({
            //filename: '[name].[fullhash].css', // Se puede cambiar el nombre del archivo.
            filename: '[name].[fullhash].css', // Se puede cambiar el nombre del archivo.
            ignoreOrder: false,

        }),
        new CopyPlugin({
            patterns: [
                { from: './src/assets/', to: 'assets/' },
            ],
        }),

    ],
}