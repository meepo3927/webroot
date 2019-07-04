<template>
<div class="slide-jigsaw" :class="rootClass"
    @mouseenter="onRootMouseEnter"
    @mouseleave="onRootMouseLeave">
    <!-- 背景图 -->
    <canvas class="fill-canvas" ref="fillCanvas"
        :width="W" :height="H"
        :class="fillCanvasClass"></canvas>
    <!-- 滑块图 -->
    <canvas :height="H" ref="clipCanvas" class="clip-canvas"
        :style="clipStyle"></canvas>
    <!-- 滑块区域 -->
    <div class="slider-container" :style="containerStyle">
        <span v-text="slideCenterText"></span>
        <!-- MASK -->
        <div class="mask-bar" :style="maskStyle" :class="maskClass"></div>
        <!-- 滑块 -->
        <div class="hand-slider" :style="sliderStyle" :class="sliderClass"
            @mouseenter="onSliderMouseEnter"
            @mousedown="onSliderMouseDown">
            <i class="fa" :class="iconClass"></i>
        </div>
    </div>
</div>
</template>

<script>
const BOUND = 10;
const ENTER_SHOW_DELAY = 450;
const methods = {};
methods.onRootMouseEnter = function () {
    this.enterTimer = setTimeout(() => {
        this.hovering = true;
    }, ENTER_SHOW_DELAY);
};
methods.onRootMouseLeave = function () {
    if (this.enterTimer) {
        clearTimeout(this.enterTimer);
        this.enterTimer = 0;
    }

    this.hovering = false;
};
methods.onSliderMouseEnter = function () {
    if (this.enterTimer) {
        clearTimeout(this.enterTimer);
        this.enterTimer = 0;
    }
    // 立即显示
    this.hovering = true;
};
methods.onSliderMouseDown = function (e) {
    if (this.status === 'loaderror') {
        return false;
    }
    if (this.checking) {
        return false;
    }
    this.dragging = true;
    this.startLeft = this.left;
    this.startX = e.clientX;
};
methods.onMouseMove = function (e) {
    if (!this.dragging) {
        return;
    }
    const distance = e.clientX - this.startX;
    let left = this.startLeft + distance;
    // 边界检查
    const MAX_LEFT = this.W - 40;
    if (left < 0) {
        left = 0;
    } else if (left > MAX_LEFT) {
        left = MAX_LEFT;
    }
    this.left = left;
};
methods.onMouseUp = function () {
    if (!this.dragging) {
        return;
    }
    this.dragging = false;
    // 检查结果
    this.checkAction();
    this.startLeft = undefined;
    this.startX = undefined;
};
methods.checkAction = function () {
    this.checking = true;
    if (Math.abs(this.left - this.x) < BOUND) {
        this.setStatus('success');
        this.$emit('success');
    } else {
        this.setStatus('fail');
        this.$emit('fail');
        this.timer = setTimeout(this.reset, 1200);
    }
};
methods.reset = function () {
    // 清空定时
    clearTimeout(this.timer);
    this.timer = 0;
    // 恢复状态
    this.setStatus('default');
    this.left = 0;
    this.checking = false;
    // 重绘拼图位置
    this.drawClip();
};
methods.setStatus = function (ss) {
    this.status = ss;
};
methods.initImage = function () {
    this.loadImage(this.imgsrc, () => {
        this.drawClip();
    });
};
methods.loadImage = function (src, callback) {
    const img = new Image();
    // img.crossOrigin = 'Anonymous';
    img.onload = () => {
        callback && callback();
    };
    img.onerror = () => {
        this.status = 'loaderror';
    };
    img.src = src;
    this.img = img;
};
// 绘制裁剪
methods.drawClip = function () {
    this.cleanCanvas();
    this.x = this.getRandomX();
    this.y = this.getRandomY();
    this.drawShape(this.fillCtx, this.x, this.y, 'fill');
    this.drawShape(this.clipCtx, this.x, this.y, 'clip');
    this.fillCtx.drawImage(this.img, 0, 0, this.W, this.H);
    this.clipCtx.drawImage(this.img, 0, 0, this.W, this.H);
    // 裁剪
    const y = this.y - this.R * 2 - 1;
    const ImageData = this.clipCtx.getImageData(
        this.x - 3, y,
        this.L, this.L
    );
    this.$refs.clipCanvas.width = this.L;
    this.clipCtx.putImageData(ImageData, 0, y);
};
methods.drawShape = function (ctx, x, y, operation) {
    const l = 42;
    const r = this.R;
    const PI = Math.PI;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI);
    ctx.lineTo(x + l, y);
    ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI);
    ctx.lineTo(x + l, y + l);
    ctx.lineTo(x, y + l);
    ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true);
    ctx.lineTo(x, y);
    ctx.lineWidth = 2;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.stroke();
    ctx[operation]();
    // ctx.globalCompositeOperation = isIE ? 'xor' : 'overlay'
    ctx.globalCompositeOperation = 'overlay';
    return ctx;
};
methods.cleanCanvas = function () {
    this.fillCtx.clearRect(0, 0, this.W, this.H);
    this.clipCtx.clearRect(0, 0, this.W, this.H);
    this.$refs.clipCanvas.width = this.W;
};
methods.getRandom = function (start, end) {
    return Math.round(Math.random() * (end - start) + start);
};
methods.getRandomX = function () {
    return this.getRandom(
        this.L + 10,
        this.W - this.L - 10
    );
};
methods.getRandomY = function () {
    return this.getRandom(
        11,
        this.H - this.L - 3
    );
};
methods.bindEvents = function () {
    const docElem = document.documentElement;
    docElem.addEventListener('mousemove', this.onMouseMove);
    docElem.addEventListener('mouseup', this.onMouseUp);
};
methods.unbindEvents = function () {
    const docElem = document.documentElement;
    docElem.removeEventListener('mousemove', this.onMouseMove);
    docElem.removeEventListener('mouseup', this.onMouseUp);
};
const computed = {};
computed.W = function () {      // 画布宽
    const width = Math.round(this.w * 1);
    if (!width || isNaN(width)) {
        // 默认宽度
        return 360;
    }
    return width;
};
computed.H = function () {      // 画布高
    return 155;
};
computed.L = function () {      // 拼图边长
    return 64;
};
computed.R = function () {
    return 9;
};
computed.btnHeight = function () {
    return 42;
};
computed.rootClass = function () {
    return [
        this.isModeStatic ? 'mode-static' : 'mode-float',
        this.dragging ? 'in-dragging': '',
        this.hovering ? 'hovering' : '',
        'status-' + this.status,
    ]
};

computed.clipStyle = function () {
    return {
        left: this.left + 'px'
    }
};
computed.sliderStyle = function () {
    const height = this.btnHeight - 2;
    return {
        left: this.left + 'px',
        width: this.btnHeight + 'px',
        height: height + 'px',
        lineHeight: this.btnHeight + 'px'
    }
};
computed.sliderClass = function () {
    return [
        'status-' + this.status,
        this.dragging ? 'in-dragging': ''
    ]
};
computed.maskStyle = function () {
    return {
        width: this.left + 'px'
    }
};
computed.maskClass = function () {
    return [
        'status-' + this.status
    ]
};
computed.iconClass = function () {
    const MAP = {
        'default': 'fa-arrow-right',
        'success': 'fa-check',
        'fail': 'fa-close'
    };
    const faClass = MAP[this.status] || MAP['default'];
    return [faClass]
};
computed.slideCenterText = function () {
    if (this.dragging) {
        return '';
    }
    const TEXT_MAP = {
        'loaderror': '图片加载失败',
        'success': '',
        'fail': '',
        'default': '滑动填充拼图'
    };
    return TEXT_MAP[this.status];
};
computed.containerStyle = function () {
    return {
        width: this.W + 'px',
        height: this.btnHeight + 'px',
        lineHeight: this.btnHeight + 'px'
    }
};
computed.isModeStatic = function () {
    return (this.mode === 'static');
};
const created = function () {
    // window.Jigsaw = this;
};
const mounted = function () {
    this.fillCtx = this.$refs.fillCanvas.getContext('2d');
    this.clipCtx = this.$refs.clipCanvas.getContext('2d');
    this.initImage();
    this.bindEvents();
};
const beforeDestroy = function () {
    this.unbindEvents();
};
const dataFunc = function () {
    let o = {
        hovering: false,
        dragging: false,
        //x, y 是拼图的坐标
        x: 0,
        y: 0,
        left: 0,
        status: 'default'
    };
    return o;
};
export default {
    data: dataFunc,
    created,
    methods,
    computed,
    props: ['imgsrc', 'w', 'mode'],
    mounted,
    mixins: [],
    beforeDestroy,
    components: {}
};
</script>

<style scoped lang="less">
@canvas-height:      155px;
@active-back-color:  #1991FA;
@fail-back-color:    #F57A7A;
@success-back-color: #52CCBA;
@mask-default-border-color: #1991FA;
@mask-success-border-color: #52CCBA;
@mask-fail-border-color:    #F57A7A;
@mask-default-back-color:   #D1E9FE;
@mask-success-back-color:   #D2F4EF;
@mask-fail-back-color:      #FCE1E1;
.slide-jigsaw {
    position: relative;
}
// 静态模式
.slide-jigsaw.mode-static {
    .clip-canvas {
        position: absolute;
        top: 0;
    }
}
// 浮动模式
.slide-jigsaw.mode-float {
    .fill-canvas, .clip-canvas {
        position: absolute;
        z-index: 3;
        top: -(@canvas-height + 15px);
        transition: visibility .3s linear, opacity .5s ease;
    }
    // 显示隐藏控制
    .fill-canvas, .clip-canvas {
        visibility: hidden;
        opacity: 0;
    }
    &.hovering,
    &.in-dragging,
    &.status-fail {
        .fill-canvas, .clip-canvas {
            visibility: visible;
            opacity: 1;
        }
    }
}

.slider-container {
    text-align: center;
    background-color: #f7f9fa;
    border: 1px solid #e4e7eb;
    position: relative;
    user-select: none;
    & > span {
        color: #45494c;
        font-size: 14px;
    }
}
.mask-bar {
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition: background .3s ease;
    &.status-default {
        background-color: @mask-default-back-color;
        border: 1px solid @mask-default-border-color;
    }
    &.status-success {
        background-color: @mask-success-back-color;
        border: 1px solid @mask-success-border-color;
    }
    &.status-fail {
        background-color: @mask-fail-back-color;
        border: 1px solid @mask-fail-border-color;
    }
}
.hand-slider {
    position: absolute;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    top: 0px;
    text-align: center;
    cursor: pointer;
    transition: background .2s ease;
    background-color: #fff;
    &.status-loaderror {
        cursor: default;
    }
    &.in-dragging,
    &.status-default:hover {
        background-color: @active-back-color;
        i {
            color: #fff;
        }
    }
    &.status-success {
        cursor: default;
        background-color: @success-back-color;
        i {color: #fff;}
    }
    &.status-fail {
        cursor: default;
        background-color: @fail-back-color;
        i {color: #fff;}
    }
    i {
        font-size: 18px;
        color: #777;
    }
}
</style>
