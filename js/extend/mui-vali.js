/**
 * 依赖
 * 1. jquery
 * 2. mui-tooltip
 * 用法
 *
 * <form id="form1">
 *     <input type="text" required />
 * </form>
 *
 * import Vali from 'mui-vali.js';
 * let formElem = document.getElementById('form1');
 * let fmVali = new Vali(formElem);
 * fmVali.check();
 *
 * 支持 required, pattern
 */
const $ = require('jquery');
const Tooltip = require('./mui-tooltip.js');
const REQUIRED_TAG_MSG_MAP = {
    SELECT: '请在列表中选择一项'
};
function showErrorMsg(elem, text) {
    // 显示-浮动文字
    let tooltip = new Tooltip({
        target: elem,
        text: text,
        silent: true,
        autoShow: true,
        skin: 'vali'
    });
    var destroy = () => {
        if (tooltip) {
            tooltip.destroy();
            tooltip = null;
        }
        if (clickOutSide) {
            document.removeEventListener('click', clickOutSide);
            clickOutSide = null;
        }
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    };
    // 点击其他区域，自动消失
    var clickOutSide = (e) => {
        if (tooltip.elem.contains(e.target)) {
            return false;
        }
        destroy();
    };
    setTimeout(() => {
        document.addEventListener('click', clickOutSide);
    }, 100);
    var timer = setTimeout(destroy, 4600);
}
function showRequiredMsg(elem, text) {
    return showErrorMsg(elem, elem.getAttribute('required-errmsg') || text);
}
function showPatternMsg(elem, text) {
    return showErrorMsg(elem, elem.getAttribute('pattern-errmsg') || text);
}
function MUIVali(formElem) {
    if (!formElem) {
        throw Error('Param Form Element Error.');
    }
    if (formElem.jquery && formElem[0]) {
        this.$fm = $(formElem[0]);
    } else {
        this.$fm = $(formElem);
    }
    this.reset();
}
const proto = MUIVali.prototype;
proto.reset = function () {
    this.nameStackMap = {};
};
proto.check = function () {
    // reset
    this.reset();
    let queue = [];
    this.$fm.find(':input').each((i, elem) => {
        if (elem.disabled) {
            return;
        }
        if ($(elem).filter(':visible').length === 0) {
            return;
        }
        if (elem.getAttribute('required') || elem.getAttribute('pattern')) {
            queue.push(elem);
        }
    });
    for (let i = 0; i < queue.length; i++) {
        if (this.checkElem(queue[i]) === false) {
            return false;
        }
    }
    return true;
};
//---------- 检查单元素 ----------
proto.checkElem = function (elem) {
    let tagName = elem.tagName.toUpperCase();
    let type = (elem.getAttribute('type') || '').toLowerCase();
    if (tagName === 'INPUT') {
        if (type === 'radio' || type === 'checkbox') {
            return this.checkRadio(elem, type);
        } else {
            return this.checkValue(elem, tagName);
        }
    } else if (tagName === 'SELECT') {
        return this.checkValue(elem, tagName);
    } else if (tagName === 'TEXTAREA') {
        return this.checkValue(elem, tagName);
    }
};
proto.checkValue = function (elem, tagName) {
    if (elem.getAttribute('required')) {
        let val = $(elem).val();
        if (val === undefined || val === null || (val + '').trim() === '') {
            showRequiredMsg(elem, REQUIRED_TAG_MSG_MAP[tagName] || '请填写此字段');
            return false;
        }
    }
    if (elem.getAttribute('pattern')) {
        let reg = new RegExp(elem.getAttribute('pattern'), 'i');
        let val = $(elem).val();
        if (!reg.test(val)) {
            showPatternMsg(elem, '请填写符合格式要求的内容')
            return false;
        }
    }
    return true;
};
//---------- 检查radio和checkbox ----------
proto.checkRadio = function (elem, type) {
    let name = elem.getAttribute('name');
    // 无名不验
    if (!name) {
        return true;
    }
    // 同名check过了
    if (!this.pushInMap(elem, 'input_' + type + '_' + name)) {
        return true;
    }
    // 同名元素
    let $elems = this.$fm.find(`input[type=${type}][name=${name}]`);
    if ($elems.filter(':checked').length) {
        return true;
    } else {
        showRequiredMsg(elem, '请从这些选项中选择一个');
        return false;
    }
};
proto.pushInMap = function (elem, key) {
    if (this.nameStackMap[key]) {
        for (let i = 0; i < this.nameStackMap[key].length; i++) {
            if (this.nameStackMap[key] === elem) { // 已存在
                return false;
            }
        }
        this.nameStackMap[key].push(elem);
        return true;
    } else {
        this.nameStackMap[key] = [elem];
        return true;
    }
};

module.exports = MUIVali;