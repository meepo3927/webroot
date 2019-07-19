<template>
<label>
    <input type="radio" :name="name" v-model="value" />
    <em><i></i></em>
    <span v-text="text" v-if="text"></span>
</label>
</template>

<script>
const methods = {};
const computed = {};
const created = function () {};
const mounted = function () {};
const beforeDestroy = function () {};
const dataFunc = function () {
    const o = {};
    return o;
};
export default {
    data: dataFunc,
    created,
    methods,
    computed,
    props: ['name', 'text', 'value'],
    mounted,
    mixins: [],
    beforeDestroy,
    components: {}
};
</script>

<style scoped lang="less">
@main-color:        #0B88E7;
@radio-size:        24px;
@radio-inner-pad:    4px;
@radio-border-width: 2px;
@radio-inner-size:   @radio-size - @radio-inner-pad * 2 - @radio-border-width * 2;
@font-size:         16px;
label {
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
label:hover > em {
    border-color: @main-color;
}
// 选中
input[type=radio]:checked ~ em {
    border-color: @main-color;
    & > i {
        background-color: @main-color;
    }
}
</style>
