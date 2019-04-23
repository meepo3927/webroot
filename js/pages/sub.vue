<template>
<div class="test-upload">
    <h4>oh Sub</h4>
    <form ref="fm">
        <div class="mm-row">
            <label for="">UserName:</label>
            <div>
                <input type="text" class="form-control" required/>
            </div>
        </div>

        <div class="mm-row mt20">
            <label for="">Password:</label>
            <div>
                <input type="text" class="form-control" required/>
            </div>
        </div>

        <div class="mt20">
            <button class="btn btn-primary" type="button" @click="submit" >提交</button>
        </div>
    </form>
</div>
</template>

<script>
import 'root';
import Vali from 'extend/mui-vali.js';
let methods = {};
methods.submit = function () {
    this.$msg(this.formVali.check('all'));
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
.scroll-test {
    border: 1px solid #ccc;
    width: 460px;
    background-color: #fff;
}
.scroll-test-1 {
    max-height: 320px;
}
.scroll-test-2 {
    top: 0;
    right: 0;
    height: 50vh;
}
.table-wrapper {
    width: 40vw;
}
.b-block {
    height: 80vh;
}
.list-1 {
    padding: 8px;
    li {
        margin: 15px;
    }
}
.ol-1 {
    width: 300px;
    padding: 20px;
    border: 1px solid #ddd;
}
ol > li:hover {
    background-color: yellow;
}
.menu-2, .menu-3 {
    position: absolute;
    width: 220px;
    height: 240px;
    border: 1px solid #eee;
    left: 320px;
    z-index: 1;
    background-color: #fff;
}
.menu-2 {
    top: 220px;
}
.menu-3 {
    top: 250px;
}
</style>
