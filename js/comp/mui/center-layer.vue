<template>
<div class="mui-msg" >
    <div class="mui-msg-content" >
        <div class="mui-layer-header">
            <slot name="header"></slot>
            <a href="javascript:;" @click="onCloseClick" class="vx-close-btn">
                <i class="fa fa-times"></i>
            </a>
        </div>
        <div class="mui-layer-content">
            <slot></slot>
        </div>
    </div>
</div>
</template>

<script>
import Cover from 'util/cover.js';
let methods = {};
methods.onCloseClick = function () {
    this.$emit('close');
};
let computed = {};
let watch = {};
const created = function () {};
const mounted = function () {
    this.coverInstance = new Cover({
        show: true
    });
};
const beforeDestroy = function () {
    if (this.coverInstance) {
        this.coverInstance.remove();
        this.coverInstance = null;
    }
};
const dataFunc = function () {
    let o = {};
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
.mui-msg-content {
    border-radius: 4px;
    background-color: #fff;
    text-align: left;
}
.mui-layer-header {
    font-size: 18px;
    padding: 15px 20px 10px 20px;
    min-height: 36px;
    .vx-close-btn {
        color: #777;
        position: absolute;
        top: 4px;
        right: 10px;
        padding: 8px;
        i.fa {
            font-size: 24px;
        }
    }
}
.mui-layer-content {
    padding: 15px 20px 20px 20px;
}
</style>
