<template>
<div class="test-upload">
    <h4>oh Sub</h4>
    <div class="h-block">
        <button class="btn btn-default pos-r" @click="test1"
            :style="{left: btnLeft + 'px'}">TEST1</button>
        <br />
        <button class="btn btn-default pos-r" ref="btn2">TEST2</button>
    </div>
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
    <backtop />
</div>
</template>

<script>
import 'root';
import Vali from 'extend/mui-vali.js';
import Animate from 'util/animate.js';
import backtop from 'comp/mui/backtop.vue';
let methods = {};
methods.test1 = function () {
    Animate.run({from:0, to: 100}, (v) => {
        this.btnLeft = v;
    });
    $(this.$refs.btn2).css('left', '10em');
    $(this.$refs.btn2).animate({left: '100px'}, {duration: 400});
};
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
        btnLeft: 0,
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
        backtop
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
    height: 80vh;
}

</style>
