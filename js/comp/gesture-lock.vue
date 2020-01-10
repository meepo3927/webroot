<template>
<canvas :width="W" :height="W"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"></canvas>
</template>

<script>
import {Circle, NUM, Line} from 'lib/gesture-lock.js';
const methods = {};
methods.renderError = function () {
    this.drawError();
    this.delayReset();
};
methods.onTouchStart = function (e) {
    if (this.locked) {
        return false;
    }
    if (this.delayTimer) {
        this.reset();
    }
    const p = this.getXY(e);
    this.touching = true;
};
methods.onTouchMove = function (e) {
    if (!this.touching || this.locked) {
        return false;
    }
    const p = this.getXY(e);
    for (let i = 0; i < this.circles.length; i++) {
        const circle = this.circles[i];
        if (circle.includePoint(p) && this.line.add(i, circle)) {
            circle.setState('active');
            this.drawAll();
        }
    }
};
methods.onTouchEnd = function (e) {
    if (!this.touching) {
        return false;
    }
    this.touching = false;
    const v = this.line.getValue();
    if (v.length <= 1) {
        return this.reset();
    }
    this.$emit('end', v, this);
};
methods.getXY = function (e) {
    const b = this.$el.getBoundingClientRect();
    const X = e.touches[0].clientX;
    const Y = e.touches[0].clientY;
    // LOG(X + ' ' + Y + ' ' + b.left + ' ' + b.top);
    return {
        x: X - b.left,
        y: Y - b.top
    }
};
methods.delayReset = function () {
    this.delayTimer = setTimeout(this.reset, 1500);
};
methods.reset = function () {
    if (this.delayTimer) {
        clearTimeout(this.delayTimer);
        this.delayTimer = undefined;
    }
    this.line.reset();
    this.circles.forEach((cc) => {
        cc.reset();
    });
    this.cleanCanvas();
    this.drawCircles();
};
methods.cleanCanvas = function () {
    const ctx = this.$el.getContext('2d');
    ctx.clearRect(0, 0, this.W, this.W);
};
methods.lock = function () {
    this.locked = true;
};
methods.unlock = function () {
    this.locked = false;
};
methods.init = function () {
    this.line = new Line(this.$el);
    this.circles = [];
    for (let i = 0; i < NUM * NUM; i++) {
        this.circles.push(new Circle(this.$el, i + 1));
    }
    this.drawCircles();
};
methods.drawCircles = function () {
    this.circles.forEach((cc) => {
        cc.draw();
    });
};
methods.drawAll = function () {
    this.cleanCanvas();
    this.drawCircles();
    this.line.draw();
};
methods.drawError = function () {
    this.cleanCanvas();
    this.circles.forEach((cc) => {
        (cc.state === 'active') ? cc.drawError() : cc.draw();
    });
    this.line.drawError();
};
const computed = {};
computed.W = function () {
    return 320;
};
const created = function () {};
const mounted = function () {
    window.GestureLock = this;
    document.addEventListener('touchend', this.onTouchEnd);
    this.$nextTick(this.init);
};
const beforeDestroy = function () {
    document.removeEventListener('touchend', this.onTouchEnd);
};
const dataFunc = function () {
    const o = {
        touching: false,
        locked: false
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
canvas {
    background-color: #FFF;
}
</style>
