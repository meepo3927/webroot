var Plugin = {};
var localEnv = !(location.host);
Plugin.install = function (Vue, options) {
    let methods = {};
    methods.getPageUrl = function (path, param = '') {
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
    methods.getImageUrl = function (path) {
        return this.vImgPath + path;
    };
    methods.vueCreateComponent = function (component, myData) {
        let Constructor = Vue.extend(component);
        let instance = new Constructor({
            data: myData
        });

        instance.vm = instance.$mount();
        document.body.appendChild(instance.vm.$el);
        return instance;
    };
    methods.vueDisposeComponent = function (instance) {
        let $el = instance.vm.$el;
        if ($el.parentNode) {
            $el.parentNode.removeChild($el);
        }
        instance.$destroy(true);
        return instance;
    };
    let computed = {};
    computed.vImgPath = function () {
        if (localEnv) {
            return './images';
        }
        if (Config.isProduction) {
            return Config.basePath + '/images';
        }
        return '/images';
    };
    computed.vSpace = function () {
        return '　';
    };
    Vue.mixin({
        methods,
        computed
    });
};

module.exports = Plugin;