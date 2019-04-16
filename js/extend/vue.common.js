const Plugin = {};
Plugin.install = function (Vue, options) {
    // 路径封装
    Vue.$getPageUrl = (path, param = '') => {
        if (localEnv) {
            if (path.charAt(0) === '/') {
                return '.' + path + '.html' + param;
            } else {
                return './' + path + '.html' + param;
            }
        }
        if (Config.isProduction) {
            return Config.basePath + path + '.jsp' + param;
        }
        return Config.basePath + path + '.html' + param;
    };
    Vue.$getImageUrl = (path) => {
        if (Config.isProduction) {
            return Config.basePath + '/images' + path;
        }
        const localEnv = !(location.host);
        if (localEnv) {
            return './images' + path;
        }
        return '/images' + path;
    };
    Vue.$newComponent = (component, data, el) => {
        const Constructor = Vue.extend(component);
        const instance = new Constructor({
            data
        });
        instance.$mount(el || document.body);
        return instance;
    };
    Vue.$disposeComponent = (instance) => {
        const $el = instance.$el;
        if ($el.parentNode) {
            $el.parentNode.removeChild($el);
        }
        instance.$destroy(true);
        return instance;
    };
    Vue.$spaceChar = '　';
    if (Config.mock) {
        Vue.prototype.$ = jQuery;
    }
};

module.exports = Plugin;