const CALLBACK_NAME = 'onWebAMapLoad';
const MAP_VERSION = '1.4.15';
const MAP_SRC = 'https://webapi.amap.com/maps?'
    + 'v=2.0'
    + '&key=54fc25c73b5aa3a4d5fef63d7095f19e'
    + '&callback=' + CALLBACK_NAME;
const isFunction = function (f) {
    return Object.prototype.toString.call(f) === '[object Function]';
};
const callbackStack = [];
const noop = () => {};
const amap = {
    loadStatus: undefined
};
amap.load = (callback) => {
    if (window.AMap) {
        isFunction(callback) && callback(window.AMap);
        return true;
    }
    // 加载中
    if (amap.loadStatus === 'loading') {
        isFunction(callback) && callbackStack.push(callback);
        return false;
    }
    window[CALLBACK_NAME] = () => {
        amap.loadStatus = 'loaded';
        // 执行队列中的
        callbackStack.forEach((func) => {
            func(window.AMap);
        });
        callbackStack.length = 0;
        isFunction(callback) && callback(window.AMap);
        window[CALLBACK_NAME] = null;
    };
    const node = document.createElement('script');
    node.charset = 'utf-8';
    node.src = MAP_SRC;
    amap.loadStatus = 'loading';
    document.body.appendChild(node);
    return false;
};
amap.getCurrentPosition = (onComplete, onError = noop) => {
    amap.load(() => {
        window.AMap.plugin('AMap.Geolocation', function () {
            const o = {
                enableHighAccuracy: true,
                showButton: false,
                showMarker: false,
                showCircle: false,
                panToLocation: false,
                zoomToAccuracy: false
            };
            const geo = new AMap.Geolocation(o);
            AMap.event.addListener(geo, 'complete', onComplete);
            AMap.event.addListener(geo, 'error', onError);
            geo.getCurrentPosition();
        });
    });
};
amap.loc = () => {
    return new Promise((resolve, reject) => {
        amap.getCurrentPosition((result) => {
            resolve(result);
        }, (err) => {
            reject(err);
        });
    });
};
amap.getPolygonCenter = (list) => {
    let x = 0.0;
    let y = 0.0;
    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        if (item.lng && item.lat) {
            x += parseFloat(item.lng);
            y += parseFloat(item.lat);
        } else if (item[0] && item[1]) {
            x += parseFloat(item[0]);
            y += parseFloat(item[1]);
        }
    }
    x /= list.length;
    y /= list.length;
    return new AMap.LngLat(x, y);
};
export default amap;