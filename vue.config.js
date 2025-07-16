module.exports = {
    devServer: {
        port: 8081,
        hot: true
    },
    chainWebpack: config => {
        // 开发环境使用更轻量的 source map
        if (process.env.NODE_ENV === 'development') {
            config.devtool('eval-cheap-module-source-map');
        }

        // 禁用可能导致冲突的 Progress 插件
        config.plugins.delete('progress');
        config.plugins.delete('ProgressPlugin');
        config.plugins.delete('progress-webpack-plugin');
        // 排除大型已编译库的 Babel 处理
        config.module
            .rule('js')
            .exclude.add(/(node_modules|echarts\.min\.js)/);
    },
    transpileDependencies: [],
    publicPath: './',
    outputDir: 'dist', // build时构建文件的目录 构建时传入 --no-clean 可关闭该行为
    assetsDir: 'assets', // build时放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
    filenameHashing: true, // 默认在生成的静态资源文件名中包含hash以控制缓存
    runtimeCompiler: false, // 是否使用包含运行时编译器的 Vue 构建版本
    productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
}
