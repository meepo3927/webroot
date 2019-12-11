/**
 * 请求数据
 */
import Promise from 'promise';
import Ajax from 'util/ajax.js';
// import Fetch from 'util/fetch.js';
import Store from 'global/center_store.js';

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
const getToken = () => {
    if (Store.state.token) {
        return 'Bearer ' + Store.state.token;
    }
};
const getTokenHeader = () => {
    const h = {};
    if (Store.state.token) {
        h.Authorization = 'Bearer ' + Store.state.token;
    }
    return h;
};
const handleResultSuccess = (result) => {
    if (!result || result.success === false) {
        return Promise.reject(result);
    }
    return result;
};
const handleResultData = (result) => {
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
const fetchJSON = (path, param, options) => {
    if (isProduction || useProxy) {
        var p = Ajax.fetch(ajaxUrlBase + `${path}.action`, param, options)
    } else {
        p = Ajax.fetch(ajaxUrlBase + `${path}.json`, param, options)
    }
    return p.then(handleResultSuccess);
};
const fetchJSONData = (path, param) => {
    return fetchJSON(path, param).then(handleResultData);
};
const getJWTData = (path, param) => {
    const options = {
        headers: getTokenHeader()
    };
    return fetchJSON(path, param, options).then(handleResultData);
};
const post = (path, param) => {
    const url = ajaxUrlBase + path + '.action';
    return Ajax.post(url, param, {
        dataType: 'json',
        Authorization: getToken()
    }).then(handleResultSuccess);
};
const postJSON = (path, param) => {
    const url = ajaxUrlBase + path;
    if (typeof param === 'object') {
        param = JSON.stringify(param);
    }
    const options = {
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json',
            Authorization: getToken()
        }
    };
    return Ajax.post(url, param, options).then(handleResultSuccess);
};

export {
    fetchJSON,
    fetchJSONData,
    getJWTData,
    post,
    postJSON
};
