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
        // publicPath: '/static/' // js css img的前置目录
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
        // alias: {
        //     "react/jsx-dev-runtime": "react/jsx-dev-runtime.js",
        //     "react/jsx-runtime": "react/jsx-runtime.js"
        // },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                // exclude: /node_modules/,
                loader: "ts-loader",
                options: {
                    configFile: path.join("./tsconfig.json")
                }
            },
            // {
            //     test:/\.scss?$/,
            //     use: [
            //         MiniCssExtractPlugin.loader,
            //         "css-loader",
            //         "sass-loader"
            //     ]
            // },

            // {
            //     oneOf: [
            //         {
            //             test:/\.less?$/,
            //             loader: "less-loader",
            //             options: {
            //                 modifyVars: getThemeVariables({
            //                     dark: true, // 开启暗黑模式
            //                     // compact: true, // 开启紧凑模式
            //                 }),
            //                 javascriptEnabled: true
            //             }
            //         },
            //         {
            //             test:/\.scss$/,
            //             loader: "sass-loader",
            //         }
            //     ]
            // },
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
                                dark: false, // 是否开启暗黑模式
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
    devServer: {
        port: 8888,
        inline: true,
        contentBase:  path.join(__dirname, "dist"),
        proxy: {
            '/map': { // 代理请求会在target后面加上/map，因此需要pathRewrite重定向
                target: 'https://apis.map.qq.com/ws/direction/v1/walking/',
                // target: 'https://apis.map.qq.com/ws/direction/v1/walking/?from=39.99056917901832,116.2809705734253&to=39.98705097110308,116.28056287765503&key=PGPBZ-EPBK4-JFZUT-X4PIJ-7C3BZ-CUB74',
                changeOrigin: true, // 这个参数可以让target参数是域名。
                secure: false, // 不检查安全问题 设置后，可以接受运行在 HTTPS 上，可以使用无效证书的后端服务器
                pathRewrite: {
                    '^/map': '/'   //重写接口 - 以/map开头的替换为/ - 记得配置文件的修改需要重启服务
                }
            }
        }
    },
    devtool: "source-map", // inline-source-map
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
            inject: 'body',
            // favicon: path.join(__dirname, "dashboards/static/img/favicon.ico")
        })
    ]
};
