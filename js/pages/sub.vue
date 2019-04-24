<template>
<div class="test-upload">
    <h4>oh Sub</h4>
    <div class="h-block"></div>
    <form ref="fm">
        <div class="mm-row">
            <label for="" class="col-1">UserName:</label>
            <div>
                <input type="text" class="form-control" required/>
            </div>
        </div>

        <div class="mm-row mt20">
            <label for="" class="col-1">Password:</label>
            <div>
                <input type="text" class="form-control" required/>
            </div>
        </div>

        <div class="mm-row mt20">
            <label for="" class="col-1">Upload:</label>
            <div>
                <input-file v-model="file1" ref="inputFile" />
            </div>
        </div>

        <div class="mt20">
            <button class="btn btn-primary" type="button" @click="submit" >提交</button>
        </div>
    </form>
    <div class="h-block"></div>
</div>
</template>

<script>
import 'root';
import Vali from 'extend/mui-vali.js';
let methods = {};
methods.submit = function () {
    this.$msg(this.formVali.check());
};
let computed = {};
let watch = {};
const created = function () {};
const mounted = function () {
    window.VM = this;
    this.formVali = new Vali(this.$refs.fm);
};
const beforeDestroy = function () {};
const dataFunc = function () {
    let o = {
        file1: ''
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
    mixins: [],
    beforeDestroy,
    components: {
    }
};
</script>

<style scoped lang="less">
.test-upload {
    padding-top: 15px;
    padding-left: 15px;
}
form {
    border: 1px solid #eee;
    padding: 12px;
    .col-1 {
        width: 6em;
    }
}
.h-block {
    height: 110vh;
}

</style>
