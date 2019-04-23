<template>
<router-view></router-view>
</template>

<script>
import Root from 'root';
import Home from 'pages/home.vue';
import Test from 'pages/test.vue';

const Upload = (r) => {
    require.ensure([], () => {
        r(require('pages/upload.vue'));
    });
};
const routes = [
    {path: '/', component: Home},
    {path: '/test', component: Test},
    {path: '/upload', component: Upload}
];
let methods = {};
let computed = {};
let watch = {};
const created = function () {};
const mounted = function () {
    window.Index = this;
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
