<template>
<router-view></router-view>
</template>

<script>
import Root from 'root';
import Home from 'pages/home.vue';
const routes = [
    {path: '/', component: Home},
    {path: '/test', component: () => import('pages/test.vue')}
];
const methods = {};
const computed = {};
const watch = {};
const created = function () {};
const mounted = function () {
    window.Index = this;
    this.$HACK_VUE_ROUTER_IE();
};
const beforeDestroy = function () {};
const dataFunc = function () {
    const o = {};
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
