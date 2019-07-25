<template>
<label :class="rootClass" @click="onClick">
    <input type="radio" :name="name" :checked="checked"
        ref="radio" />
    <em><i></i></em>
    <span v-text="text" v-if="text"></span>
</label>
</template>

<script>
const methods = {};
methods.onClick = function (e) {
    if (this.isDisabled) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
};
// 处理value和input.checked不相同的情况
// 以input实际状态为准
methods.syncRealStatus = function () {
    if (this.isValueTrue !== this.getChecked()) {
        this.$emit('input', this.getChecked());
    }
};
methods.syncInputWhenNeed = function () {
    if (this.isValueTrue !== this.getChecked()) {
        this.$emit('input', this.getChecked());
    }
};
methods.getChecked = function () {
    return this.$refs.radio.checked;
};
methods.setChecked = function (b) {
    this.$refs.radio.checked = b;
};
methods.handleClick = function () {
    this.$nextTick(this.syncInputWhenNeed);
};
methods.handleMouseUp = function () {
    this.$nextTick(this.syncInputWhenNeed);
};
const computed = {};
computed.isValueTrue = function () {
    return (this.value === true) || (this.value === 'checked');
};
computed.isDisabled = function () {
    return (this.disabled !== undefined) && (this.disabled !== false);
};
computed.rootClass = function () {
    return [
        this.isDisabled ? 'status-disabled' : 'status-enabled'
    ]
};
const watch = {};
watch.value = function (val) {
    if (val === true || val === 'checked') {
        this.setChecked(true);
    } else {
        this.setChecked(false);
    }
};
const created = function () {};
const mounted = function () {
    if (this.isValueTrue) {
        this.setChecked(true);
    }
    this.$nextTick(this.syncRealStatus);
    // 有click, mouseup动作后 同步数据
    document.documentElement.addEventListener(
        'click', this.handleClick, true
    );
    document.documentElement.addEventListener(
        'mouseup', this.handleMouseUp, true
    );
};
const beforeDestroy = function () {
    document.documentElement.removeEventListener(
        'click', this.handleClick, true
    );
    document.documentElement.removeEventListener(
        'mouseup', this.handleMouseUp, true
    );
};
const dataFunc = function () {
    const o = {
    };
    return o;
};
export default {
    data: dataFunc,
    created,
    watch,
    methods,
    computed,
    props: ['name', 'text', 'value', 'disabled'],
    mounted,
    mixins: [],
    beforeDestroy,
    components: {}
};
</script>

<style scoped lang="less">
@main-color:            #0B88E7;
@disabled-main-color:   #85C4F3;
@radio-size:        24px;
@radio-inner-pad:    4px;
@radio-border-width: 2px;
@radio-inner-size:   @radio-size - @radio-inner-pad * 2 - @radio-border-width * 2;
@font-size:         16px;
label.status-enabled {
    cursor: pointer;
}
input[type=radio] {
    visibility: hidden;
    position: absolute;
    
}
em, em > i {
    border-radius: 50%;
    display: inline-block;
}
em {
    width: @radio-size;
    height: @radio-size;
    text-align: center;
    vertical-align: middle;
    line-height: 0;
    padding-top: @radio-inner-pad;
    border: @radio-border-width solid #8E8E8E;
    & > i {
        width: @radio-inner-size;
        height: @radio-inner-size;
        background-color: inherit;
    }
}
span {
    font-size: @font-size;
    margin-left: 2px;
    vertical-align: middle;
}
// HOVER
label.status-enabled:hover > em {
    border-color: @main-color;
}
// 选中
input[type=radio]:checked ~ em {
    border-color: @main-color;
    & > i {
        background-color: @main-color;
    }
}
// 失效
label.status-disabled {
    & > em {
        border-color: #C7C7C7;
    }
    & > span {
        color: #AAA;
    }
    input[type=radio]:checked ~ em {
        border-color: @disabled-main-color;
        & > i {
            background-color: @disabled-main-color;
        }
    }
}
</style>
