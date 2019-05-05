import 'polyfill';
import '../less/entry.scss';
// 基础库
window.LOG = function () {
    if (window.console && window.console.log) {
        var len = arguments.length;
        for (var i = 0; i < len; i++) {
            window.console.log(arguments[i]);
        }
    }
};
window.LOGJ = (a) => {
    LOG(JSON.parse(JSON.stringify(a)));
};
// 扩展库
import MUIMsg from 'extend/vue.mui-msg.js';
import MUIMsgBox from 'extend/vue.mui-msgbox.js';
import MUIloading from 'extend/vue.mui-loading.js';
import MUITooltip from 'extend/vue.mui-tooltip.js';
import VueRouter from 'vuerouter';
import VueCommon from 'extend/vue.common.js';
import VueClickOut from 'extend/vue.clickout.js';
import MUIScroll from 'comp/mui/scroll.vue';
import centerlayer from 'comp/common/center-layer.vue';
import vDate from 'comp/common/date.vue';
import FileUpload from 'comp/common/file-upload.vue';
import InputFile from 'comp/common/input-file.vue';
import InputNumber from 'comp/common/input-number.vue';
import LevelMenu from 'comp/level-menu.vue';
import Sticky from 'extend/vue.sticky.js';
Vue.use(VueRouter);
Vue.use(VueCommon);
Vue.prototype.$msg = MUIMsg;
Vue.prototype.$alert = MUIMsgBox.alert;
Vue.prototype.$confirm = MUIMsgBox.confirm;
Vue.prototype.$prompt = MUIMsgBox.prompt;
Vue.prototype.$loading = MUIloading;
Vue.directive('tooltip', MUITooltip);
Vue.directive('clickout', VueClickOut);
Vue.directive('sticky', Sticky);
Vue.component('mui-scroll', MUIScroll);
Vue.component('v-date', vDate);
Vue.component('file-upload', FileUpload);
Vue.component('input-file', InputFile);
Vue.component('input-number', InputNumber);
Vue.component('level-menu', LevelMenu);
export default {
    VueRouter
}