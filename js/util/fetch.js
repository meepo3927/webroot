/**
 * @描述  封装Promise
 * @用法  同jQuery.ajax()
 */

const $ = require('jquery');
const Promise = require('promise');

const fetch = function () {
    const args = Array.prototype.slice.call(arguments);
    return new Promise((resolve, reject) => {
        return $.ajax.apply(null, args).success((result) => {
            result ? resolve(result) : reject(result);
        }).error(reject);
    });
};
fetch.getJSON = (url, data) => {
    return fetch({
        url, data,
        type: 'GET',
        dataType: 'json'
    });
};
module.exports = fetch;