<template>
<div class="test-upload">
    <h4>oh yeah</h4>
    <file-upload filetype="image" />
    <file-upload filetype="excel" class="mt10" />
    <input-file />
    <!-- 滚动测试 -->
    <mui-scroll class="scroll-test-2 scroll-test" ref="ss2" position="absolute">
        <div>
            <ul class="list-1">
                <li>噢呃噢呃</li>
                <li v-for="v in list1" v-text="v"></li>
            </ul>

            <button class="btn btn-default m20" @click="onClick1">Add Item+</button>
        </div>
    </mui-scroll>
    <div class="fl" >
        <button class="btn btn-danger" type="button" @click="onClick0">Danger</button>
    </div>
    <level-menu :list="menuList" v-if="visible"/>
    <div class="table-wrapper ">
        <table class="table table-striped mt20">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>用户名</th>
                    <th>得分</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="v in users" :class="[v.cls]">
                    <td v-text="v.id"></td>
                    <td v-text="v.name"></td>
                    <td v-text="v.score"></td>
                </tr>
            </tbody>
        </table>
    </div>
    
    <div class="pb30"></div>
</div>
</template>

<script>
import 'root';
let methods = {};
methods.onClick0 = function () {
    this.visible = !this.visible;
};
methods.onClick1 = function () {
    this.list1.push(this.list1.length + '. ' + Math.random() + _.now());
    this.list1.push(this.list1.length + '. ' + Math.random() + _.now());
    this.list1.push(this.list1.length + '. ' + Math.random() + _.now());
};
let computed = {};
computed.users = function () {
    return [
        {id: 111, name: '郭野', score: 123},
        {id: 111, name: '郭野-active', score: 123, cls: 'active'},
        {id: 111, name: '郭野-success', score: 123, cls: 'success'},
        {id: 111, name: '郭野', score: 123},
        {id: 111, name: '郭野', score: 123},
        {id: 111, name: '郭野-info', score: 123, cls: 'info'},
        {id: 111, name: '郭野', score: 123},
        {id: 111, name: '郭野', score: 123},
        {id: 111, name: '郭野-warning', score: 123, cls: 'warning'},
        {id: 111, name: '郭野-danger', score: 123, cls: 'danger'},
        {id: 111, name: '郭野', score: 123},
        {id: 111, name: '郭野-active', score: 123, cls: 'active'},
        {id: 111, name: '郭野', score: 123}
    ]
};
computed.menuList = function () {
    return [
        {
            name: '用户研究中心',
            children: [
                {name: '用户研究'},
                {name: '动态标签训练'},
                {name: '标签使用日志'},
                {
                    name: '标签管理',
                    children: [
                        {name: '标签生命周期管理'},
                        {name: '标签预下线管理'}
                    ]
                }
            ]
        },
        {name: '预约下线'},
        {name: '营销资源中心'},
        {name: '模型视窗'}
    ]
};
let watch = {};
const created = function () {};
const mounted = function () {
    window.VM = this;
};
const beforeDestroy = function () {};
const dataFunc = function () {
    let o = {
        gender: "",
        visible: false,
        list1: []
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
