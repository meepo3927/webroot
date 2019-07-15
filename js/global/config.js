// From Webpack
let env = '';
try {
    env = process.env.NODE_ENV;
} catch(e) {
    env = 'production';
}

// 运行环境
const isProduction = (env === 'production');

// 全局Inject变量
const global = window.global || {};
const basePath = global.basePath || '';

// 用户信息
const user = {};

module.exports = {
    env,
    basePath,
    user,
    mock: !isProduction,
    isProduction
};
