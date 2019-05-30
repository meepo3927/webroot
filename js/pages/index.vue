<template>
<router-view></router-view>
</template>

<script>
import Root from 'root';
import Home from 'pages/home.vue';
import Test from 'pages/test.vue';
const routes = [
    {path: '/', component: Home},
    {path: '/test', component: Test},
    {path: '/upload', component: () => import('pages/upload.vue')},
    {path: '/child', component: () => import('pages/child.vue')}
];
let methods = {};
methods.mockEvent = function () {
    document.body.addEventListener('meepo', function (e) {
        console.log("meepo123");
        console.log(e.detail);
    });
    if (typeof window.CustomEvent === 'function') {
        var my = new CustomEvent("meepo", {
            detail: {number: 123456}
        });
    } else {
        my = document.createEvent("CustomEvent");
        my.initCustomEvent("meepo", false, false, {number: 777888});
    }
    document.body.dispatchEvent(my);
};

let computed = {};
let watch = {};
const created = function () {};
const mounted = function () {
    window.Index = this;
    this.$HACK_VUE_ROUTER_IE();
};
const beforeDestroy = function () {};
const dataFunc = function () {
    let o = {};
    return o;
};
export default {
    data: dataFunc,
    created,
    router: new Root.VueRouter({routes}),
    methods,
    computed,
    watch,
    props: [],
    mounted,
    mixins: [],
    beforeDestroy,
    components: {}
};
</script>

<style scoped lang="less">
</style>
