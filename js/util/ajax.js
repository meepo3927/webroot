/**
 * 轻量级AJAX库
 */
import Promise from 'promise';
// 空函数
const noop = () => {};

// 将字符串解析为对象
const parseJSON = (str) => {
    const funcStr = 'return (' + str + ')';
    try {
        var obj = (new Function(funcStr))();
    } catch (e) {
        obj = null;
    }
    return obj;
};
// 获取XMLHttpRequest对象
const getXhr = () => {
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        return new ActiveXObject('Microsoft.XMLHttp');
    }
};

const getIEVersion = () => {
    const versions = {
        objectobject: 7, //IE7-8
        objectundefined: 6, //IE6
        undefinedfunction: 0, // other modern browsers
        undefinedobject: 0
    };
    return document.documentMode || versions[typeof document.all + typeof XMLHttpRequest];
};

const IE = getIEVersion();

// 加载JavaScript
const loadJS = (url, onSuccess = noop, onError = noop) => {
    const head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
    let script = document.createElement('script');
    script.async = 'async';
    script.src = url;
    script.onerror = () => {
        script.onload = script.onreadystatechange = script.onerror = null;
        onError();
    };
    script.onload = script.onreadystatechange = (event) => {
        event = event || window.event;
        if (event.type === "load" || (/loaded|complete/.test(script.readyState) && (!IE || IE < 9))) {
            // Handle memory leak in IE
            script.onload = script.onreadystatechange = script.onerror = null;
            if (head && script.parentNode) {
                head.removeChild(script);
            }
            // Dereference the script
            script = undefined;
            if (onSuccess) {
                setTimeout(onSuccess, 1);
            }
        }
    };
    head.appendChild(script);
    return script;
};

const buildParamStr = (param) => {
    if (!param) {
        return '';
    }
    if (typeof param === 'string') {
        return param;
    }

    if (typeof param !== 'object') {
        return param + '';
    }

    const arr = [];
    for (let i in param) {
        if (param.hasOwnProperty(i)) {
            arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(param[i]))
        }
    }
    return arr.join('&');
};

/**
 * url      请求链接
 * param    {a: 1, b: 2} 或者 'a=1&b=2'
 * type     'GET' or 'POST'
 * dataType 'json' or 'html'
 */
const fetch = (url, param = {}, type = 'GET', dataType = 'json') => {
    if (!url) {
        return Promise.reject();
    }
    const xhr = getXhr();
    if (!xhr) {
        throw Error('get XMLHttpRequest Fail');
    }
    type = type.toUpperCase();
    dataType = dataType.toLowerCase();
    const p = new Promise((resolve, reject) => {
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) {
                return;
            }
            if (dataType === 'json') {
                const result = parseJSON(xhr.responseText);
                if (result) {
                    return resolve(result);
                } else {
                    return reject(xhr)
                }
            }
            return xhr.responseText ? resolve(xhr.responseText) : reject(xhr);
        };
    });
    if (type === 'POST') {
        xhr.open('POST', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(buildParamStr(param));
    } else {
        const paramStr = buildParamStr(param);
        if (paramStr) {
            url += (url.indexOf('?') >= 0) ? '&' : '?';
            url += paramStr;
        }
        xhr.open('GET', url, true);
        xhr.send();
    }
    return p;
};

// POST请求
const post = (url, param) => {
    return fetch(url, param, 'POST');
};

// JSONP相关
let JSONP_CALLBACK_ID = 1000;
const getJSONPCallbackId = () => {
    var a = (++JSONP_CALLBACK_ID);
    var b = (new Date()).getTime() + '';
    var c = parseInt(Math.random() * 9999999, 10) + '';
    // return 'jsonp_callback';
    return 'jsonp_callback_' + a + b + c;
};
// JSONP请求
const jsonp = (url, param) => {
    if (!url) {
        return Promise.resolve();
    }
    const myId = getJSONPCallbackId();
    const paramStr = buildParamStr(param);
    url += (url.indexOf('?') >= 0) ? '&' : '?';
    url += paramStr + '&callback=' + myId;
    let called = false;
    let timer;
    const p = new Promise((resolve, reject) => {
        window[myId] = function (result) {
            if (called) { // 防止重复执行
                return;
            }
            called = true;
            clearTimeout(timer);
            if (result === undefined || result === null) {
                return reject(result);
            } else {
                return resolve(result);
            }
        };
        const onTimeout = () => { // 超时了
            reject();
        };
        const onload = () => {
            timer = setTimeout(onTimeout, 800);
        };
        loadJS(url, onload, reject);
    });
    return p;
};

export default {
    fetch,
    post,
    jsonp
}
