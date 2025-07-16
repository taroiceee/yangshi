// postcss.config.js（如不存在可创建）
module.exports = {
    plugins: {
        'postcss-import': {},    // 之前安装的插件
        'postcss-url': {},       // 新增此插件
        // 其他可能的插件（如 autoprefixer）
        autoprefixer: {}
    }
};