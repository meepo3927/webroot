<template>
<label>
    <input type="checkbox" ref="checkbox" @change="handleChange"
        :name="name" 
        :checked="checked"
        :value="inputValue" />
    <em><i class="fa fa-check"></i></em>
    <span v-text="text" v-if="text"></span>
</label>
</template>

<script>
const methods = {};
methods.syncInput = function () {
    if (this.getChecked()) {
        if (this.inputValue) {
            this.$emit('input', this.inputValue);
        } else {
            this.$emit('input', true);
        }
    } else {
        this.$emit('input', false);
    }
};
methods.getChecked = function () {
    return this.$refs.checkbox.checked;
};
methods.setChecked = function (b) {
    this.$refs.checkbox.checked = b;
};
methods.handleChange = function () {
    this.$nextTick(this.syncInput);
};
methods.isValueTrue = function (val) {
    return (val === true) || (val === 'checked') || (
        this.inputValue && (val === this.inputValue)
    );
};
const computed = {};
const watch = {};
watch.value = function (val) {
    if (val === this.getChecked()) {
        return;
    }
    if (this.isValueTrue(val)) {
        this.setChecked(true);
    } else {
        this.setChecked(false);
    }
};
watch.inputValue = function (inputVal) {
    const isStr = typeof this.value === 'string';
    if (inputVal) {
        if (isStr) {
            if (this.value === inputVal) {
                this.setChecked(true);
            } else {
                this.setChecked(false);
            }
        }
    } else if (isStr) {
        this.setChecked(false);
    }
};
const created = function () {};
const mounted = function () {
    if (this.isValueTrue(this.value)) {
        this.setChecked(true);
    } else {
        this.setChecked(false);
    }
};
const beforeDestroy = function () {
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
    props: [
        'name', 'text', 'value', 'inputValue'
    ],
    mounted,
    mixins: [],
    beforeDestroy,
    components: {}
};
</script>

<style scoped lang="less">
@main-color:        #0B88E7;
@input-size:        24px;
@input-inner-pad:    4px;
@input-border-width: 2px;
@input-inner-size:   @input-size - @input-inner-pad * 2 - @input-border-width * 2;
@fa-size:            @input-size - @input-border-width * 2;
@font-size:         16px;
label {
    cursor: pointer;
}
input[type=checkbox] {
    visibility: hidden;
    position: absolute;
}
em {
    display: inline-block;
    width: @input-size;
    height: @input-size;
    text-align: center;
    vertical-align: middle;
    line-height: 0;
    // define in `cube` style
    // padding-top: @input-inner-pad;
    border: @input-border-width solid #8E8E8E;
    // cube
    & > i.cube {
        display: inline-block;
        width: @input-inner-size;
        height: @input-inner-size;
        background-color: inherit;
    }
    // icon
    & > i.fa {
        font-size: 0;
    }
}
span {
    font-size: @font-size;
    margin-left: 2px;
    vertical-align: middle;
}
// HOVER
label:hover > em {
    border-color: @main-color;
}
// 选中
input[type=checkbox]:checked ~ em {
    border-color: @main-color;
    & > i.cube {
        background-color: @main-color;
    }
    & > i.fa {
        color: @main-color;
        font-size: @fa-size;
    }
}
</style>
