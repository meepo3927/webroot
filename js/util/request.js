/**
 * 请求数据
 */
import Promise from 'promise';
import Ajax from 'util/ajax.js';
// import Fetch from 'util/fetch.js';
const isProduction = Config.isProduction;
const isMock = !isProduction;
const useProxy = (URL.query().__useProxy === '1');

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
const baseFetch = (url, param) => {
    return Ajax.fetch(url, param).then(handleResult);
    // return Fetch.getJSON(url, param).then(handleResult);
};
const fetchJSON = (path, param) => {
    if (isProduction || useProxy) {
        return baseFetch(ajaxUrlBase + `${path}.action`, param);
    }
    return baseFetch(ajaxUrlBase + `${path}.json`, param);
};
const fetchJSONData = (path, param) => {
    return fetchJSON(path, param).then(handleResult2);
};
const post = (path, param) => {
    const url = ajaxUrlBase + path + '.action';
    return Ajax.post(url, param, {dataType: 'json'}).then(handleResult);
};

export {
    baseFetch,
    fetchJSON,
    fetchJSONData,
    post
};
