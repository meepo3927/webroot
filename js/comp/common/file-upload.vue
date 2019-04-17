<template>
<span class="v-file-upload">
    <!-- 文件名 -->
    <label class="v-file-name" :for="elemId" >
        <div v-text="fileName" :title="fileName"></div>
    </label>
    <!-- 选择文件 -->
    <label class="choose-btn" title="选择文件" :for="elemId" 
        v-show="selectBtnVisible"
        v-text="labelText"></label>
    <!-- 上传按钮 -->
    <label class="send-btn" v-show="sendBtnVisible" :class="{disabled: loading}"
        @click="checkAndSend">{{loading ? '上传中..' : '上传'}}</label>
    <!-- 错误信息 -->
    <span class="error-msg" v-show="errmsgVisible" 
        v-text="errmsg"></span>
    <!-- 查看文件 -->
    <a :href="value" class="open-file" target="_blank" v-show="openFileVisible">查看文件</a>
    <!-- 实际表单 -->
    <form :action="formAction" style="display: none;" ref="form">
        <slot></slot>
    </form>
</span>
</template>

<script>
import formAsync from 'util/form_async.js';
let uuid = 1;
const TYPE_EXT_MAP = {
    image: 'jpg,png,jpeg,gif',
    excel: 'xlsx,xls'
};
const TYPE_TEXT_MAP = {
    image: '图片',
    excel: 'Excel'
};
const isFilePreviewSupported = (typeof window.FileReader !== 'undefined');
// 类型错误信息
const getTypeErrMsg = (type) => {
    type = type ? type.toLowerCase() : '';
    let text = TYPE_TEXT_MAP[type] || type;
    return '请选择[' + text + ']类型的文件';
};
// HTML5类型判断
const HTML5ValiType = (allowType, type) => {
    if (!type) {
        return getTypeErrMsg(allowType);
    }
    const arr = type ? type.split('/') : [];
    if (arr.length === 0) {
        return getTypeErrMsg(allowType);
    }
    if (arr[0] === allowType) {
        return true;
    }
    return getTypeErrMsg(allowType);
};
// 校验扩展名
const valiFileExtension = (allowType, fileName) => {
    // 没有扩展名
    if (fileName.indexOf('.') === -1) {
        return getTypeErrMsg(allowType);
    }
    // 没有扩展名
    const ext = fileName.split('.').pop();
    if (!ext) {
        return getTypeErrMsg(allowType);
    }
    const allowExtentions = (TYPE_EXT_MAP[allowType] || '').toLowerCase().split(',');
    if (allowExtentions.indexOf(ext) >= 0) {
        return true;
    }
    return getTypeErrMsg(allowType);
};
// 校验类型
const valiFileType = (el, filetype, fileName) => {
    if (!filetype) {  // 没有type限制
        return true;
    }
    if (el.files && el.files.length === 0) { // 没有选中文件
        return true;
    }
    var fileInstance = el.files && el.files[0];
    if (fileInstance) {
        // return HTML5ValiType(filetype, fileInstance.type);
    }
    // 校验扩展名
    return valiFileExtension(filetype, fileName);
};

let methods = {};
methods.removeFileInput = function () {
    let $file = $(this.$refs.form).children('.v-file');
    if ($file.length) {
        $file.remove();
    }
};
methods.makeFileInput = function () {
    let $file = $('<input type="file" class="v-file" />');
    $file.css('display', 'none');
    $file.attr('id', this.elemId);
    $file.attr('name', this.inputName);
    $file.on('change', (e) => {
        this.change(e);
    });
    $(this.$refs.form).append($file);
};
methods.getFileInputElem = function () {
    return $(this.$refs.form).children('.v-file')[0];
};
methods.reset = function () {
    this.fileValue = '';
    this.filePath = '';
    this.errmsg = '';
    this.removeFileInput();
    this.makeFileInput();
};
// 检查文件类型
methods.checkType = function (el) {
    el = el || this.getFileInputElem();
    if (!el) {
        return true;
    }
    return valiFileType(el, this.filetype, this.file);
};
methods.change = function (e) {
    var elem = e.target || e.currentTarget;
    var value = elem.value;
    this.filePath = value;

    let result = this.checkType(elem);
    if (result !== true) {
        this.fileValue = '';
        this.errmsg = result;
        return false;
    }

    // this.preview(elem.files);

    // 没有选择文件
    if (!value) {
        return false;
    }

    this.fileValue = value;
    if (this.checkNull()) {
        this.errmsg = '';
        if (this.sendOnSelect) {
            // Send request to server
            this.send();
        }
    } else {
    }
};
methods.preview = function (files) {
    if (!files) {
        return false;
    }
    var file = files[0];
    if (!file) {
        return false;
    }
    if (!isFilePreviewSupported) {
        return false;
    }
    var reader = new window.FileReader();
    reader.onload = () => {
        this.$emit('preview', reader.result);
    }
    reader.readAsDataURL(file);
};
methods.checkNull = function () {
    if (!this.fileValue) {
        return '请上传文件';
    }
    return true;
};
methods.check = function () {
    if (this.silent) {
        return true;
    }
    // 类型不对
    let r = this.checkType();
    if (r !== true) {
        this.errmsg = r;
        return false;
    }
    // 没有上传文件
    r = this.checkNull();
    if (r !== true) {
        this.errmsg = r;
        return false;
    }
    this.errmsg = '';
    return true;
};
methods.checkAndSend = function () {
    if (this.loading) {
        return false;
    }
    this.errmsg = '';
    // 文件为空
    if (!this.filePath) {
        this.errmsg = '请选择文件';
        return false;
    }
    // 类型不对
    let r = this.checkType();
    if (r !== true) {
        this.errmsg = r;
        return false;
    }
    return this.send();

};
methods.send = function () {
    this.loading = true;
    var fa = formAsync(this.$refs.form, {
        success: (json) => {
            this.loading = false;
            this.$emit('success', json);
            if (json.success) {
                this.$emit('input', json.data);
            }
        },
        error: () => {
            this.loading = false;
            this.fileValue = '';
            this.errmsg = '上传失败';
            // LOG('upload error');
        }
    });
    fa.send();
};
var computed = {};
computed.elemId = function () {
    return 'v_file_upload_' + this.id;
};
computed.labelText = function () {
    return this.label || '选择文件';
};
computed.inputName = function () {
    return this.inputname || 'file';
};
computed.fileName = function () {
    if (!this.filePath) {
        return '';
    }
    var list = this.filePath.split('\\').pop();
    return list.split('/').pop();
};
computed.formAction = function () {
    return this.action;
};
computed.errmsgVisible = function () {
    if (this.errmsg) {
        return true;
    }
    return false;;
};
computed.openFileVisible = function () {
    if (this.errmsgVisible) {
        return false;
    }
    if (!this.value) {
        return false;
    }
    return true;
};
computed.selectBtnVisible = function () {
    return !this.sendBtnVisible;
};
computed.sendBtnVisible = function () {
    return this.filePath ? true : false;
};
const mounted = function () {
    this.makeFileInput();
};
const beforeDestroy = function () {};
export default {
    data: function () {
        return {
            id: (uuid++),
            fileValue: '',
            filePath: '',
            errmsg: '',
            loading: false
        };
    },
    methods,
    computed,
    props: {
        label: String,
        inputname: String,
        filetype: String,
        slient: Boolean,
        action: String,
        sendOnSelect: Boolean,
        value: {
            validator: function () {return true}
        }
    },
    mounted,
    beforeDestroy
};
</script>

<style scoped lang="less">
@height:                32px;
@line-height:           @height - 2px;
@border-radius:         3px;
@border-color:          #eee;
@background-color:      #eee;
@send-btn-back-color:   #5faee3;
.v-file-upload {
    display: table;
    table-layout: fixed;
    & > label {
        display: table-cell;
        vertical-align: middle;
        height: @height;
        line-height: @line-height;
    }
    & > span {
        vertical-align: middle;
    }
}
.v-file-name {
    min-width: 200px;
    padding-right: 10px;
    margin-right: 10px;
    & > div {
        height: @height;
        padding-left: 8px;
        padding-right: 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        background-color: @background-color;
        color: #333;
        cursor: pointer;
        white-space: nowrap;
        border-radius: @border-radius;
    }
}
.choose-btn, .send-btn {
    border: 1px solid @border-color;
    border-radius: @border-radius;
    background-color: @background-color;
    color: #fff;
    cursor: pointer;
    white-space: nowrap;
    width: 90px;
    text-align: center;
    height: @height;
    line-height: @line-height;
    font-size: 14px;
}
.choose-btn {
    background-color: #aaa;
}
.send-btn {
    background-color: @send-btn-back-color;
    border-color: #49a3df;
    &.disabled {
        cursor: default;
        background-color: lighten(@send-btn-back-color, 15%);
    }
}
.error-msg {
    margin-left: 12px;
    color: #ee0000;
    line-height: @line-height;
}
.open-file {
    margin-left: 12px;
    line-height: @height;
}
</style>