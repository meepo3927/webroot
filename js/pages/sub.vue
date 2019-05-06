<template>
<div class="test-upload">
    <h4>oh Sub</h4>
    <div class="h-block">
        <button class="btn btn-default pos-r" @click="test1"
            :style="{left: btnLeft + 'px'}">TEST1</button>
        <br />
        <button class="btn btn-default btn-2" ref="btn2" v-sticky>TEST2</button>
    </div>
    <form ref="fm" class="mt20">
        <div class="mm-row">
            <label for="" class="col-1">UserName:</label>
            <div>
                <input type="text" class="form-control" required v-model="userName" />
                <input type="hidden" value="123123" required/>
                <input type="password" value="" required v-show="gender" />
            </div>
        </div>

        <div class="mm-row mt20">
            <label class="col-1">手机号：</label>
            <div>
                <input type="text" class="form-control" required pattern="\d+"
                    required-errmsg="请输入手机号啊混蛋"
                    pattern-errmsg="请输入正确的啊"
                    v-model.trim="mobilePhone" />
            </div>
        </div>

        <div class="mm-row mt20">
            <label  class="col-1">性别：</label>
            <div>
                <label class="m-radio">
                    <input type="radio" value="boy" v-model="gender" name="gender"
                        required /> 男
                </label>
                <label class="m-radio ml20">
                    <input type="radio" value="girl" v-model="gender" name="gender"
                        required /> 女
                </label>
            </div>
        </div>

        <div class="mm-row mt20">
            <label  class="col-1">喜好：</label>
            <div>
                <label class="m-checkbox">
                    <input type="checkbox" value="boy" name="xihao" v-model="hobit[0]" /> 男
                </label>
                <label class="m-checkbox ml20">
                    <input type="checkbox" value="girl" name="xihao" v-model="hobit[1]" 
                        required/> 女
                </label>
            </div>
        </div>

        <div class="mm-row mt20">
            <label  class="col-1">城市：</label>
            <div>
                <select class="form-control" required>
                    <option value="">请选择</option>
                    <option>呼和浩特</option>
                    <option>呼伦贝尔</option>
                </select>
            </div>
        </div>

        <div class="mm-row mt20">
            <label for="" class="col-1">长篇大论：</label>
            <div>
                <textarea class="form-control" placeholder="婆婆妈妈 唧唧歪歪" required
                    v-model="sentence"></textarea>
            </div>
        </div>

        <div class="mm-row mt20">
            <label for="" class="col-1">Upload:</label>
            <div>
                <input-file v-model="file1" ref="inputFile" required 
                    :mui-value="file1" />
            </div>
        </div>

        <div class="mt20">
            <button class="btn btn-primary" type="button" @click="submit1" >提交</button>
            <input type="submit" class="btn btn-success" value="噢呃" @click.prevent="submit2" />
            <input type="button" class="btn btn-default" value="自动" @click="autoFill" />
            <input type="submit" />
        </div>
    </form>
    <div class="h-block"></div>
    <backtop />
</div>
</template>

<script>
import 'root';
import MUIVali from 'extend/mui-vali.js';
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
methods.autoFill = function () {
    this.userName = 'meepo123';
    this.mobilePhone = '13912340011';
    this.gender = 'girl';
    this.hobit[0] = true;
    this.city = '呼伦贝尔';
    this.sentence = '大话西游';
    this.formVali.reset();
};
methods.submit1 = function () {
    this.$msg(this.formVali.check());
};
methods.submit2 = function () {
    this.$msg(this.formVali.checkAll());
};
let computed = {};
let watch = {};
const created = function () {};
const mounted = function () {
    window.VM = this;
    this.formVali = new MUIVali(this.$refs.fm);
};
const beforeDestroy = function () {};
const dataFunc = function () {
    let o = {
        btnLeft: 0,
        userName: '',
        mobilePhone: '',
        file1: '',
        gender: '',
        hobit: [false, false],
        city: undefined,
        sentence: ''
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
button.btn-2 {
    width: 45vw;
}
form {
    border: 1px solid #eee;
    padding: 12px;
    .col-1 {
        width: 6em;
    }
}
.h-block {
    // height: 80vh;
    width: 780px;
}

</style>
