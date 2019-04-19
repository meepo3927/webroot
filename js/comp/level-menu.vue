<template>
<ul class="leave-menu" v-if="dataReady" :class="rootClass"
    @mouseenter="onRootMouseEnter"
    @mouseleave="onRootMouseLeave">
    <li v-for="item in list">
        <!-- 子菜单 -->
        <level-menu v-if="hasChildren(item)" :list="item.children" 
            @enter="onChildrenEnter"
            v-show="currentActive === item"
            :level="childlv" />
        <!-- 菜单项 -->
        <a href="javascript:;"
            @mouseenter="onMouseEnter(item)"
            @mouseleave="onMouseLeave(item)">
            <i class="fa fa-cube icon-1"></i>
            <span v-text="item.name"></span>
            <i class="fa fa-angle-right" v-if="hasChildren(item)"></i>
        </a>
    </li>
</ul>
</template>

<script>
const DELAY_TIME = 700;
let methods = {};
methods.onRootMouseEnter = function () {
    this.$emit('enter');
};
methods.onRootMouseLeave = function () {
    this.delayHide();
};
methods.showChildren = function (item) {
    this.currentActive = item;
};
methods.cleanTimer = function () {
    if (this.delayTimer) {
        LOG('cleanTimer');
        clearTimeout(this.delayTimer);
        this.delayTimer = 0;
    }
};
methods.delayHide = function () {
    LOG('start delayHide');
    this.delayTimer = setTimeout(() => {
        LOG('execute delayHide');
        this.showChildren(null);
    }, DELAY_TIME);
};
methods.onChildrenEnter = function () {
    this.cleanTimer();
};
methods.onMouseEnter = function (item) {
    this.cleanTimer();
    if (this.hasChildren(item)) {
        this.currentActive = item;
    } else {
        this.currentActive = null;
    }
};
methods.onMouseLeave = function (item) {
};
methods.hasChildren = function (item) {
    return (item.children && item.children.length);
};
let computed = {};
computed.dataReady = function () {
    return Array.isArray(this.list) && (this.list.length > 0);
};
computed.childlv = function () {
    return (this.level + 1);
};
computed.rootClass = function () {
    return [
        'level-' + this.level,
        (this.level > 1) ? 'level-sub' : ''
    ]
};
let watch = {};
const created = function () {};
const mounted = function () {};
const beforeDestroy = function () {};
const dataFunc = function () {
    let o = {
        currentActive: null
    };
    return o;
};
export default {
    name: 'level-menu',
    data: dataFunc,
    created,
    methods,
    computed,
    watch,
    props: {
        list: {
            type: Array,
            required: true
        },
        level: {
            type: Number,
            default: 1
        }
    },
    mounted,
    mixins: [],
    beforeDestroy,
    components: {}
};
</script>

<style scoped lang="less">
@text-color:  #5f6281;
@icon-color:  #cacad2;
@active-color: #22b9ff;
.leave-menu {
    position: absolute;
    padding: 5px 0px;
    width: 260px;
    box-shadow: 0px 0px 50px 0px rgba(82,63,105,0.15);
    background-color: #fff;
    border-radius: 4px;
    &.level-sub {
        left: 100%;
        margin-left: 1px;
    }
}
li > a {
    display: block;
    padding: 12px 10px;
    i {
        color: @icon-color;
        font-size: 16px;
    }
    i.icon-1 {
        width: 18px;
        text-align: center;
        margin-right: 18px;
    }
    span {
        color: @text-color;
        display: inline-block;
        width: 75%;
    }
}
li > a:hover {
    color: @active-color;
    i, span {
        color: inherit;
    }
}
</style>
