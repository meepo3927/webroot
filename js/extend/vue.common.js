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
        if (el && el !== document.body) {
            instance.$mount();
        } else {
            document.body.appendChild(instance.$mount().$el);
        }
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
    Vue.SPACE_CHAR = '　';
    const mounted = function () {
        this.$promiseHolder = {};
    };
    const methods = {};
    methods.$setPromise = function (name, p) {
        if (this.$promiseHolder[name]) {
            this.$promiseHolder[name].cancel();
            this.$promiseHolder[name] = undefined;
        }
        this.$promiseHolder[name] = p;
        return p;
    };
    methods.$cancelPromise = function (name) {
        if (this.$promiseHolder[name]) {
            this.$promiseHolder[name].cancel();
            this.$promiseHolder[name] = undefined;
        }
    };
    methods.$cleanPromise = function () {
        for (let i in this.$promiseHolder) {
            if (this.$promiseHolder.hasOwnProperty(i)) {
                let p = this.$promiseHolder[i];
                if (p && p.cancel) {
                    p.cancel();
                }
            }
        }
        this.$promiseHolder = {};
    };
    const beforeDestroy = function () {
        this.$cleanPromise();
    };
    Vue.mixin({
        mounted,
        methods,
        beforeDestroy
    });
    if (Config.mock) {
        Vue.prototype.$ = jQuery;
    }
};

module.exports = Plugin;
