<template>
<div class="mui-scroll-wrapper" :style="rootStyle">
    <div class="mui-scroll-inner" ref="inner"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        @mousewheel="onMouseWheel"
        v-on:DOMMouseScroll="onFFMouseWheel"><slot></slot></div>
    <!-- bar -->
    <div class="mui-scroll-bar" ref="bar" :style="barStyle"
        @mousedown="onBarMouseDown"
        @mouseenter="onBarMouseEnter"
        @mouseleave="onBarMouseLeave"
        @selectstart.stop.prevent></div>
    <!-- rail -->
    <div class="mui-scroll-rail" v-show="railVisible" ref="rail"></div>
</div>
</template>

<script>
const $ = require('jquery');
const WHEEL_STEP = 20;
let methods = {};
methods.init = function () {
    this.releaseScroll = false;
};
methods.getWrapperHeight = function () {
    return this.$el.clientHeight;
};
// 重新计算高度，并决定是否隐藏
methods.renderBar = function () {
    // calculate scrollbar height and make sure it is not too small
    let wrapperHeight = this.getWrapperHeight();
    let innerHeight = this.$refs.inner.scrollHeight;
    // LOG('wrapperHeight:' + wrapperHeight);
    // LOG('innerHeight:' + innerHeight);

    // 不滚动
    if (innerHeight <= wrapperHeight) {
        return (this.needScroll = false);
    }
    this.needScroll = true;
    let hh = (wrapperHeight / innerHeight) * wrapperHeight;
    this.barHeight = Math.round(hh);
};
methods.handleWheel = function (delta, e) {
    let barTop = this.barTop + delta * WHEEL_STEP;
    this.barTop = this.fixBarTopValue(barTop);
};
methods.onMouseEnter = function (e) {
    this.isOverPanel = true;
};
methods.onMouseLeave = function (e) {
    this.isOverPanel = false;
};
methods.onMouseWheel = function (e) {
    let delta = -e.wheelDelta / 120;
    this.handleWheel(delta, e);
};
methods.onFFMouseWheel = function (e) {
    let delta = e.detail / 3;
    this.handleWheel(delta, e);
};
methods.onBarMouseDown = function (e) {
    this.dragging = true;
    // 初始状态
    this.barStartY = e.pageY;
    this.barStartTop = this.barTop;
};
methods.onBarMouseEnter = function (e) {
    this.isOverBar = true;
};
methods.onBarMouseLeave = function (e) {
    this.isOverBar = false;
};
methods.onWinResize = function (e) {
    // debounce render
};
methods.onDocMouseMove = function (e) {
    if (!this.dragging) {
        return false;
    }
    // 计算bar的位置
    let offset = (e.pageY - this.barStartY);
    this.barTop = this.fixBarTopValue(this.barStartTop + offset);
};
methods.onDocMouseUp = function (e) {
    if (!this.dragging) {
        return false;
    }
    this.dragging = false;
    this.barStartY = 0;
    this.barStartTop = 0;
};
methods.fixBarTopValue = function (val) {
    if (val < 0) {
        return 0;
    } else if (val + this.barHeight > this.getWrapperHeight()) {
        return this.getWrapperHeight() - this.barHeight;
    }
    return val;
};
let computed = {};
computed.rootStyle = function () {
    let arr = {};
    arr.position = this.position || 'relative';
    return arr;
};
computed.barStyle = function () {
    let style = {};
    if (this.needScroll === false) {
        style.visibility = 'hidden';
        style.height = '0';
    } else {
        style.top = this.barTop + 'px';
        style.height = Math.max(this.barHeight, 20) + 'px';
    }
    return style;
};
let watch = {};
const created = function () {};
const mounted = function () {
    this.$bar = $(this.$refs.bar);
    document.documentElement.addEventListener('mousemove', this.onDocMouseMove);
    document.documentElement.addEventListener('mouseup', this.onDocMouseUp);
    window.addEventListener('resize', this.onWinResize);
    this.renderBar();
};
const beforeDestroy = function () {
    this.$bar = null;
    document.documentElement.removeEventListener('mousemove', this.onDocMouseMove);
    document.documentElement.removeEventListener('mouseup', this.onDocMouseUp);
    window.removeEventListener('resize', this.onWinResize);
};
const updated = function () {
    this.renderBar();
};
const dataFunc = function () {
    let o = {
        barTop: 0,
        barHeight: 0,
        needScroll: false,
        railVisible: false
    };
    return o;
};
export default {
    data: dataFunc,
    created,
    methods,
    computed,
    updated,
    watch,
    props: ['position'],
    mounted,
    mixins: [],
    beforeDestroy,
    components: {}
};
</script>

<style scoped lang="less">
@bar-size:  7px;
.mui-scroll-wrapper {
    overflow: hidden;
}
.mui-scroll-inner {
}
.mui-scroll-bar,
.mui-scroll-rail {
    position: absolute;
    width: @bar-size;
    right: 1px;
    border-radius: 7px;
}
.mui-scroll-bar {
    background-color: rgba(0, 0, 0, .2);
    z-index: 10;
}
.mui-scroll-rail {
    height: 100%;
    top: 0;
    background-color: rgba(50, 50, 50, .3);
    z-index: 9;
}
</style>
