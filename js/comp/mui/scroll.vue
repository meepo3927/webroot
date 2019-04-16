<template>
<div class="mui-scroll-wrapper" :style="rootStyle">
    <div class="mui-scroll-inner" ref="inner" :style="innerStyle"
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
</div>
</template>

<script>
const $ = require('jquery');
const WHEEL_STEP = 20;
const DEBOUNCE_TIME = 150;
let methods = {};
methods.init = function () {
};
methods.getWrapperHeight = function () {
    return this.$el.clientHeight;
};
methods.getInnerHeight = function () {
    return this.$refs.inner.scrollHeight
};
// 重新计算高度，并决定是否隐藏
methods.renderBar = function () {
    // calculate scrollbar height and make sure it is not too small
    let wrapperHeight = this.getWrapperHeight();
    let innerHeight = this.getInnerHeight();
    // LOG('wrapperHeight:' + wrapperHeight);
    // LOG('innerHeight:' + innerHeight);

    // 不滚动
    if (innerHeight <= wrapperHeight) {
        return (this.needScroll = false);
    }
    this.needScroll = true;
    let hh = (wrapperHeight / innerHeight) * wrapperHeight;
    this.barHeight = Math.round(hh);

    // 边界检查
    this.checkBounds();
};
methods.checkBounds = function () {
    if (this.barTop + this.barHeight > this.getWrapperHeight()) {
        // fix it
        this.barTop = this.getWrapperHeight() - this.barHeight;
        this.top = this.getTopValue();
    }
};
methods.handleWheel = function (delta, e) {
    if (this.needScroll) {
        let barTop = this.barTop + delta * WHEEL_STEP;
        this.barTop = this.fixBarTopValue(barTop);
        this.top = this.getTopValue();
        e.returnValue = false;
        e.preventDefault();
        return false;
    }
};
methods.handleResize = function () {
    this.renderBar();
};
methods.onMouseEnter = function (e) {
    this.isOverPanel = true;
};
methods.onMouseLeave = function (e) {
    this.isOverPanel = false;
};
methods.onMouseWheel = function (e) {
    let delta = -e.wheelDelta / 120;
    return this.handleWheel(delta, e);
};
methods.onFFMouseWheel = function (e) {
    let delta = e.detail / 3;
    return this.handleWheel(delta, e);
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
    clearTimeout(this.onWinResizeTimer);
    this.onWinResizeTimer = setTimeout(this.handleResize, DEBOUNCE_TIME);
};
methods.onDocMouseMove = function (e) {
    if (!this.dragging) {
        return false;
    }
    // 计算bar的位置
    let offset = (e.pageY - this.barStartY);
    this.barTop = this.fixBarTopValue(this.barStartTop + offset);
    // 计算top
    this.top = this.getTopValue();
};
methods.onDocMouseUp = function (e) {
    if (!this.dragging) {
        return false;
    }
    this.dragging = false;
    this.barStartY = 0;
    this.barStartTop = 0;
};
methods.getTopValue = function (offset) {
    if (offset === undefined) {
        offset = this.barTop;
    }
    let percent = offset / (this.getWrapperHeight() - this.barHeight);
    let val = percent * (this.getInnerHeight() - this.getWrapperHeight());
    return -val;
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
computed.innerStyle = function () {
    return {
        transform: 'translateY(' + this.top + 'px)'
    }
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
        top: 0,
        barTop: 0,
        barHeight: 0,
        needScroll: false
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
@bar-size:  8px;
.mui-scroll-wrapper {
    overflow: hidden;
}
.mui-scroll-inner {
}
.mui-scroll-bar {
    position: absolute;
    width: @bar-size;
    right: 1px;
    border-radius: 7px;
}
.mui-scroll-bar {
    background-color: rgba(0, 0, 0, .2);
    z-index: 10;
    transition: height .3s ease;
}
</style>
