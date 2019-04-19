<template>
<div class="page-index">
    <ol class="breadcrumb m15">
        <li>
            <a href="javascript:;">Home</a>
        </li>
        <li>
            <a href="javascript:;">Library</a>
        </li>
        <li class="active">
            <a href="javascript:;">Meepo</a>
        </li>
    </ol>
    <form class="p15" @submit.prevent>
        <input type="text" class="form-control" v-model="name">
        <p v-text="name"></p>
        <button class="btn btn-default" @click="msg" type="button">MUI msg</button>
        <button class="btn btn-primary" @click="alert">MUI alert</button>
    </form>
    <div class="shadow-container" v-tooltip="t1">
        fuck yeah
        <v-date />
    </div>

    <div>
        
    </div>
</div>
</template>

<script>
import 'root';
let methods = {};
methods.msg = function () {
    this.$msg(Config.env + '-' + Math.random());

};
methods.alert = function () {
    //let ld = this.$loading();
    this.$alert(Config.env + Config.basePath);
    Request.fetch2('/testAPI').then(() => {
        
    });
};
let computed = {};
computed.t1 = function () {
    return '我是tt11'
};
let watch = {};
const created = function () {};
const mounted = function () {};
const beforeDestroy = function () {};
const dataFunc = function () {
    let o = {
        name: 'meepo'
    };
    return o;
};
export default {
    data: dataFunc,
    created,
    methods,
    computed,
    watch,
    props: [],
    mounted,
    mixins: [
    ],
    beforeDestroy,
    components: {
    }
};
</script>

<style scoped lang="less">

.page-index {}

</style>
