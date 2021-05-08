const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const DecoratorsLegacy = require('babel-plugin-transform-decorators-legacy');
const aliyunTheme = require('@ant-design/aliyun-theme');
const { getThemeVariables } = require('antd/dist/theme');

module.exports = {
    entry: {
        main: path.join(__dirname, './src/main.tsx')
    },
    watch: true,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name].js?[hash]",
        // publicPath: 'src'
    },
    optimization: {
        minimize: true, // 压缩JS代码
        splitChunks:{
            cacheGroups: {
                vendors: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "initial"
                }
            }
        }
    },
    mode: "development",
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                exclude: /node_modules/,
                loader: "ts-loader",
                options: {
                    configFile: path.join("./tsconfig.json")
                }
            },
            {
                test:/\.(css|scss|less)?$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    // {
                    //     loader: "postcss-loader",
                    //     options: {
                    //         sourceMap: true,
                    //         config: {
                    //             path: path.join(__dirname, 'postcss.config.js')
                    //         }
                    //     }
                    // },
                    "sass-loader",
                    { // antd定制主题 antd样式采用less编写
                        loader: "less-loader",
                        options: {
                            modifyVars: getThemeVariables({
                                dark: true, // 开启暗黑模式
                                // compact: true, // 开启紧凑模式
                            }),
                            javascriptEnabled: true
                        }
                    }
                    // {
                    //     loader: 'style-loader',
                    // }, {
                    //     loader: 'css-loader', // translates CSS into CommonJS
                    // }, {
                    //     loader: 'less-loader', // 不建议使用5以上版本，版本过高打包带来一系列bug
                    //     options: {
                    //         modifyVars: {  // aliyunTheme 阿里云暗黑主题色
                    //             'primary-color': '#1DA57A',
                    //             'link-color': '#9c341c',
                    //             'border-radius-base': '2px'
                    //         },
                    //         javascriptEnabled: true
                    //     }
                    // }
                ]
            },
            {
                test: /\.(ttf|eot|woff)/,
                loader: "file-loader",
                options: {
                    name: 'font/[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(ico|svg|png|jpg)/,
                loader: "file-loader",
                options: {
                    name: 'img/[name].[ext]?[hash]'
                }
            }
        ]
    },
    devServer: {
        port: 8000,
        inline: true,
        contentBase:  path.join(__dirname, "dist"),
    },
    devtool: "source-map",
    plugins: [
        new MiniCssExtractPlugin({
            // css 样式分离 webpack默认会把 import '_name.css'这种导入文件直接写在html中生成内联样式，
            // 使用mini-css-extract-plugin插件可以将css样式抽离到一个文件中，其中
            // mini-css-extract-plugin是webpack4.0所使用的分离插件 extract-text-webpack-plugin是4.0之前的分离插件
            filename:"style/[name].css?[hash]",
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            template:"./index.html",
            filename: './index.html',
            inject: 'body',
            // favicon: path.join(__dirname, "dashboards/static/img/favicon.ico")
        })
    ]
};