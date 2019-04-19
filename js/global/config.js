// From Webpack
let env = '';
try {
    env = process.env.NODE_ENV;
} catch(e) {
    env = 'production';
}

// 运行环境
let isProduction = (env === 'production');

// 全局Inject变量
let global = window.global || {};
let basePath = global.basePath || '';

// 用户信息
let user = {};

module.exports = {
    env,
    basePath,
    user,
    mock: !isProduction,
    isProduction
};
