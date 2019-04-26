<template>
<div class="v-backtop" title="回到顶部" @click="onClick" :class="{vhidden}">
    <span></span>
    <i class="fa fa-arrow-up"></i>
</div>
</template>

<script>
import Animate from 'util/animate.js';
const getScrollTop = () => {
    return document.documentElement.scrollTop
        || document.body.scrollTop;
};
let methods = {};
methods.onClick = function () {
    const html = document.documentElement;
    const body = document.body;
    let scrollElem = html;
    let scrollTop = html.scrollTop;
    if (body.scrollTop) {
        scrollElem = body;
        scrollTop = body.scrollTop;
    }
    Animate.run({from: scrollTop, to: 0}, (val) => {
        scrollElem.scrollTop = val;
    });
};
methods.onScroll = function () {
    this.bodyScrollTop = getScrollTop();
};

let computed = {};
computed.vhidden = function () {
    return (this.bodyScrollTop < 100);
};
let watch = {};
const created = function () {};
const mounted = function () {
    // window.vBacktop = this;
    this.bodyScrollTop = getScrollTop();
    window.addEventListener('scroll', this.onScroll);
};
const beforeDestroy = function () {
    window.removeEventListener('scroll', this.onScroll);
};
const dataFunc = function () {
    let o = {
        bodyScrollTop: 0
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
    mixins: [],
    beforeDestroy,
    components: {}
};
</script>

<style scoped lang="less">
@color:        #666;
@hover-color:  #999;
.v-backtop {
    position: fixed;
    bottom: 40px;
    right: 39px;

    cursor: pointer;
    z-index: 1;
    border-radius: 4px;
    padding: 8px 10px 6px;
    background-color: #ddd;
    &.vhidden {
        display: none;
    }
    &:hover > span {
        background-color: @hover-color;
    }
    &:hover > i {
        color: @hover-color;
    }
    & > span {
        display: block;
        height: 6px;
        background-color: @color;
        border-radius: 4px;
        margin-bottom: -3px;
    }
    & > i {
        font-size: 30px;
        color: @color;
    }
}
</style>
