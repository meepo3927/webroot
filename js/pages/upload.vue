<template>
<div class="test-upload">
    <h4>上传测试</h4>
    <div>
        <input type="text" required id="a11" />
    </div>
    <div>
        <file-upload action="http://localhost/upload" />
    </div>
    <div class="mt10">
        <file-upload action="http://localhost/never" />
    </div>

    <form class="m15" ref="fm">
        <fieldset >
            <div class="mm-row">
                <label class="col-1">姓名:</label>
                <div class="pl15">
                    <input type="text" required class="form-control" />
                </div>
            </div>

            <div class="mm-row mt20">
                <label class="col-1">密码:</label>
                <div class="pl15">
                    <input type="password" required class="form-control" disabled/>
                </div>
            </div>

            <div class="mm-row mt20">
                <label class="col-1">性别:</label>
                <div class="pl15">
                    <label class="m-radio">
                        <input type="radio" name="gender" v-model="gender" value="man"/> 男
                    </label>
                    <label class="m-radio ml20">
                        <input type="radio" required name="gender" v-model="gender" value="woman" /> 女
                    </label>
                </div>
            </div>

            <div class="mm-row mt20" v-show="gender === 'woman'">
                <label for="" class="col-1">城市：</label>
                <div class="pl15">
                    <select class="form-control" required>
                        <option value="">请选择</option>
                        <option>呼和浩特</option>
                        <option>呼伦贝尔</option>
                    </select>
                </div>
            </div>

            <div class="mm-row mt20">
                <label for="" class="col-1">订购：</label>
                <div class="pl15">
                    <label class="m-checkbox">
                        <input type="checkbox" name="dinggou" required/> 杂志
                    </label>
                    <label class="m-checkbox ml20">
                        <input type="checkbox" name="dinggou" /> 服装
                    </label>
                    <label class="m-checkbox ml20">
                        <input type="checkbox" name="dinggou" /> 地漏
                    </label>
                    <label class="m-checkbox ml20">
                        <input type="checkbox" name="dinggou" /> 水龙头
                    </label>
                </div>
            </div>

            <div class="m-row mt20">
                <label for="" class="col-1">简介：</label>
                <div class="pl15">
                    <textarea class="form-control" required></textarea>
                </div>
            </div>

            <div class="mm-row mt20">
                <label class="col-1">&nbsp;</label>
                <div class="pl15">
                    <button class="btn btn-primary" type="button"
                        @click="submit">提交</button>
                </div>
            </div>
        </fieldset>
    </form>
    <div class="block-1"></div>
</div>
</template>

<script>
import 'root';
import Vali from 'extend/mui-vali.js';

let methods = {};
methods.submit = function () {
    let result = this.fmVali.check();
    if (result) {
        this.$msg('yes');
    } else {

    }
};
let computed = {};
let watch = {};
const created = function () {};
const mounted = function () {
    window.VM = this;
    this.fmVali = new Vali(this.$refs.fm);
};
const beforeDestroy = function () {};
const dataFunc = function () {
    let o = {
        gender: ""
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
        'file-upload': require('comp/common/file-upload.vue').default
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
.block-1 {
    width: 120vw;
    height: 90vh;
}

</style>
