// 公用的webpack.config.js文件
const path = require('path');
const webpack = require('webpack');
// 配置常量
// 源代码的根目录（本地物理文件路径）
const SRC_PATH = path.resolve('./src');
// 打包后的资源根目录（本地物理文件路径）
const ASSETS_BUILD_PATH = path.resolve('./dist');
// 资源根目录（可以是 CDN 上的绝对路径，或相对路径）
const ASSETS_PUBLIC_PATH = '/assets/';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { getThemeVariables } = require('antd/dist/theme');

module.exports = {
    entry: {
        main: path.join(__dirname, './src/main.tsx')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name].js?[hash]",
        // publicPath: '/static/' // js css img的前置目录
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    },
    module: {
        rules: [
            {
                // enforce: 'pre',  // ESLint 优先级高于其他 JS 相关的 loader
                test: /\.(ts|tsx)?$/,
                // exclude: /node_modules/,
                loader: "ts-loader", // 建议把 babel 的运行时配置放在 .babelrc 里，从而与 eslint-loader 等共享配置
                options: {
                    configFile: path.join("./tsconfig.json")
                }
            },
            {
                test:/\.(css|scss|less)?$/,
                // exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // 当前的css所在的文件相对于打包后的根路径dist的相对路径
                            // 分离css文件导致css背景图片路径错误，解决方案的核心是配置publicPath的值，
                            // publicPath的值是css文件所在的文件目录相对于根目录的相对路径值。 比如，根路径是/,css文件所在的目录是/css/，因此相对路径是..
                            publicPath: '../../'
                        }
                    },
                    "css-loader",
                    "sass-loader",
                    { // antd定制主题 antd样式采用less编写
                        loader: "less-loader",
                        options: {
                            modifyVars: getThemeVariables({
                                dark: false, // 是否开启暗黑模式
                                // compact: true, // 开启紧凑模式
                            }),
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|woff)/,
                // exclude: /node_modules/,
                loader: "file-loader",
                options: {
                    name: './publicStatic/font/[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(ico|svg|png|jpg|jpeg)/,
                // exclude: /node_modules/,
                loader: "file-loader",
                options: {
                    name: './publicStatic/img/[name].[ext]?[hash]'
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // css 样式分离 webpack默认会把 import '_name.css'这种导入文件直接写在html中生成内联样式，
            // 使用mini-css-extract-plugin插件可以将css样式抽离到一个文件中，其中
            // mini-css-extract-plugin是webpack4.0所使用的分离插件 extract-text-webpack-plugin是4.0之前的分离插件
            filename:"./publicStatic/style/[name].css?[hash]",
            chunkFilename: "[id].css"
        }),
        // 将 webpack中`entry`配置的相关入口chunk  和  `extract-text-webpack-plugin`抽取的css样式   插入到该插件提供的`template`或者`templateContent`
        // 配置项指定的内容基础上生成一个html文件，具体插入方式是将样式`link`插入到`head`元素中，`script`插入到`head`或者`body`中。
        new HtmlWebpackPlugin({
            template:"./index.html",
            filename: './index.html',
            inject: 'body', // true：默认值，script标签位于html文件的 body 底部
            // favicon: path.join(__dirname, "dashboards/static/img/favicon.ico")
            //  html 文件进行压缩
            minify: {
                removeComments: true,               //去注释
                collapseWhitespace: true,           //压缩空格
                removeAttributeQuotes: true         //去除属性 标签的 引号  例如 <p id="test" /> 输出 <p id=test/>
            }
        })
    ]
};