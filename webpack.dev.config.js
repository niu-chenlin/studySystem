// 读取同一目录下的 base config
const config = require('./webpack.base.config');

// 根据base配置服务
config.devServer = {
    port: 8888,
    inline: true,
    contentBase:  path.join(__dirname, "dist"),
};
config.devtool = "source-map";
config.watch = true;
config.module.rules.push( // 配置自己的less loader
    {
        test: /\.less$/,
        use: [
            'style-loader',
            'css-loader',
            'less-loader'
        ],
        exclude: /node_modules/
    }
);
// 真实场景中，React、jQuery 等优先走全站的 CDN，所以要放在 externals 中
config.externals = {
    react: 'React',
    'react-dom': 'ReactDOM'
};
// config.plugins.push(
//     new webpack.HotModuleReplacementPlugin()
// );