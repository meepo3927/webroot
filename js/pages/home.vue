<template>
<div class="page-home">
    <h1>Home</h1>
    <div class="profile-box">
        <mui-radio text="尼玛A" name="nima" v-model="A" />
        <mui-radio text="尼玛B" name="nima" class="ml20" v-model="B" />
        <br />
        <mui-radio text="尼玛C" name="" class="" v-model="C" />
    </div>
</div>
</template>

<script>
import 'root';
const methods = {};
const computed = {};

const watch = {};
const created = function () {};
const mounted = function () {
    window.VM = this;
};
const beforeDestroy = function () {};
const dataFunc = function () {
    let o = {
        A: true,
        B: true,
        C: false
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
    mixins: [
    ],
    beforeDestroy,
    components: {
    }
};
</script>

<style scoped lang="less">
.page-home {}
.profile-box {
    padding: 20px;
    border: 1px solid #ccc;
}
</style>
