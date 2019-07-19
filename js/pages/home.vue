<template>
<div class="page-home">
    <h1>Home</h1>
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
        C: false,

        C1: '',
        C2: true,
        C3: false,
        C4: 'a4'
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
