<template>
<div>
    <div>
        <label>高度：</label>
        <select v-model="boxHeight" @change="onSelChange">
            <option>auto</option>
            <option>300px</option>
            <option>600px</option>
            <option>1000px</option>
            <option>2000px</option>
        </select>
        <button class="btn-1" @click="print1">PRINT</button>
    </div>
    <div class="box-1" :style="boxStyle">
        {{boxHeight}}
    </div>
</div>
</template>

<script>
const methods = {};
methods.getIEVersion = function () {
    var versions = {
        objectobject: 7, //IE7-8
        objectundefined: 6, //IE6
        undefinedfunction: NaN, // other modern browsers
        undefinedobject: NaN
    };
    return document.documentMode || versions[typeof document.all + typeof XMLHttpRequest];
};
methods.noticeMyHeight = function () {
    var name = '$' + (new Date().getTime()) + Math.random().toString(32).substr(2);
    var height = document.documentElement.offsetHeight;
    if (this.getIEVersion() <= 10) {
        height = document.body.scrollHeight;
    }
    if (window.parent) {
        var data = {
            href: location.href,
            height: height + 1
        };
        var str = JSON.stringify(data);
        window.parent.postMessage(str, '*');
    }
};
methods.onSelChange = function () {
    this.$nextTick(this.noticeMyHeight);
};
methods.print1 = function () {
    LOG('document.documentElement.offsetHeight:' + document.documentElement.offsetHeight);
    LOG('document.documentElement.clientHeight:' + document.documentElement.clientHeight);
    LOG('document.documentElement.scrollHeight:' + document.documentElement.scrollHeight);
    LOG('document.body.offsetHeight:' + document.body.offsetHeight);
    LOG('document.body.clientHeight:' + document.body.clientHeight);
    LOG('document.body.scrollHeight:' + document.body.scrollHeight);
    LOG('window.innerHeight:' + window.innerHeight);
};
const computed = {};
const created = function () {};
computed.boxStyle = function () {
    return {
        height: this.boxHeight
    }
};
const mounted = function () {
    setTimeout(this.noticeMyHeight, 60);
};
const beforeDestroy = function () {};
const dataFunc = function () {
    let o = {
        boxHeight: 'auto'
    };
    return o;
};
export default {
    data: dataFunc,
    created,
    methods,
    computed,
    props: [],
    mounted,
    mixins: [],
    beforeDestroy,
    components: {}
};
</script>

<style scoped lang="less">
.box-1 {
    background-color: #f00;
}
</style>
