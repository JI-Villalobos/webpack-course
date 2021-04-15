const { type } = require('os')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')

/**@type {import('webpack').Configuration}*/

/* Exportar modulo de configuración*/
module.exports = {
    /*punto de entrada */
    entry: './src/index.js',
    
    /*punto de salida*/
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode:'development',
    watch:true,
    /*Extenciones del proyecto*/
    resolve: {
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/')
        }
    },

    module: {
        rules: [
            {
                //usa cualquier extencion .mjs o .js
                test: /\.m?js$/,
                //excluye elementos de /node_modules
                exclude: /node_modules/,
                //especifica el loader
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                //usa archivos con extención css y .styl
                test: /\.css|.styl$/i,
                //especifica el loader
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader'
                ],
            },
            {
                test: /\.png/,
                type:'asset/resource'
            },
            {
                //usa archivos extención .woff o .woff2
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: "application/font-woff",
                        name: "[name].[contenthash].[ext]",
                        outputPath: "./assets/fonts/",
                        publicPath: "../assets/fonts/",
                        esModule: false,
                    }
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            //archivo que comolacara en la carpeta de dist
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv(),
    ],
}