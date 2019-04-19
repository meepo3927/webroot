/**
 * 请求数据
 */
const Promise = require('promise');
const config = require('config');
const URL = require('util/url');
const Fetch = require('util/fetch');
const isProduction = config.isProduction;
const isMock = !isProduction;
const useProxy = (URL.query().useProxy === '1');

// Ajax请求路径
if (isProduction) {
    var ajaxUrlBase = Config.basePath;
} else if (useProxy) {
    ajaxUrlBase = '/TD-common-web';
} else {
    ajaxUrlBase = '/mock';
}

const handleResult = (result) => {
    if (!result || result.success === false) {
        return Promise.reject(result);
    }
    return result;
};
const handleResult2 = (result) => {
    if (!result) {
        return Promise.reject(result);
    }
    if (result.success === true) {
        return result.data;
    }
    if (result.success === undefined && result.data !== undefined) {
        return result.data;
    }
    return Promise.reject(result);
};
const baseFetch = (url, data) => {
    return Fetch.getJSON(url, data).then((result) => {
        return handleResult(result);
    });
};
const fetch1 = (path, param) => {
    if (isProduction || useProxy) {
        return baseFetch(ajaxUrlBase + `${path}.do`, param);
    }
    return baseFetch(ajaxUrlBase + `${path}.json`, param);
};
const fetch2 = (path, param) => {
    return fetch1(path, param).then((result) => {
        return handleResult2(result);
    });
};
const post = (path, param) => {
    let url = ajaxUrlBase + path + '.do';
    return Fetch.post(url, param).then((r) => {
        return handleResult(r);
    });
};


const exports = {
    fetch1,
    fetch2,
    post
};

module.exports = exports;