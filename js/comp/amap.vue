<template>
<div class="comp-amap"></div>
</template>

<script>
const MAP_SRC = 'https://webapi.amap.com/maps?v=1.4.15&key=54fc25c73b5aa3a4d5fef63d7095f19e&callback=onAMapLoad';
const methods = {};
// 添加标记
methods.addMarker = function (item) {
    const lng = item.lng;
    const lat = item.lat;
    if (!item || !item.lng || !item.lat) {
        return null;
    }
    const marker = new AMap.Marker({
        map: this.map,
        position: new AMap.LngLat(item.lng, item.lat),
        extData: item,
        label: {
            content: item.markerContent,
            direction: 'bottom'
        }
    });
    marker.on('click', (e) => {
        this.$emit('marker-click', marker, this, e);
    });
    const name = item.markerId || Tool.randStr();
    this.markerHolder[name] = marker;
    return marker;
};
methods.cleanMarker = function () {
    for (let k in this.markerHolder) {
        if (this.markerHolder.hasOwnProperty(k)) {
            this.map.remove(this.markerHolder[k]);
        }
    }
    this.markerHolder = {};
};
// 多边形
methods.addPolygon = function (item, options = {}) {
    const points = item.points;
    if (!points || !points.length) {
        return null;
    }
    const polygonPath = points.map(v => {
        return new AMap.LngLat(v.lng, v.lat)
    });
    // 中心点
    // const centerPoint = this.getPolygonCenter(points);
    const o = Tool.extend({
        map: this.map,
        strokeWeight: 2,
        strokeColor: '#1472CE',
        strokeStyle: 'dashed',
        fillColor: '#1472CE',
        fillOpacity: .5,
        cursor: 'pointer'
    }, options);
    o.extData = item;
    o.path = polygonPath;
    const polygon = new AMap.Polygon(o);
    polygon.on('click', (e) => {
        this.$emit('polygon-click', e, this, this.map);
    });
    const name = item.polygonId || Tool.randStr();
    this.polygonHolder[name] = polygon;
    return polygon;
};
methods.getPolygonCenter = function (list) {
    let x = 0.0;
    let y = 0.0;
    for (let i = 0; i < list.length; i++) {
        x += parseFloat(list[i].lng);
        y += parseFloat(list[i].lat);
    }
    x /= list.length;
    y /= list.length;
    return new AMap.LngLat(x, y);
};
methods.getPolygonById = function (id) {
    return this.polygonHolder[id];
};
methods.getMarkerById = function (id) {
    return this.markerHolder[id];
};
methods.loadMap = function (callback) {
    if (window.AMap) {
        callback && callback(window.AMap);
        return true;
    }
    if (!this.loadMapCallbacks) {
        this.loadMapCallbacks = [];
    }
    if (this.loadMapStatus === 'loading') {
        callback && this.loadMapCallbacks.push(callback)
        return false;
    }
    window.onAMapLoad = () => {
        this.loadMapStatus = 'loaded';
        callback && callback(window.AMap);
        this.loadMapCallbacks.forEach((func) => {
            func(window.AMap);
        });
        this.loadMapCallbacks.length = 0;
        window.onAMapLoad = null;
    };
    const node = document.createElement('script');
    node.charset = 'utf-8';
    node.src = MAP_SRC;
    this.loadMapStatus = 'loading';
    document.body.appendChild(node);
    return false;
};
methods.init = function (AMap) {
    const map = this.map = new AMap.Map(this.$el, {
        esizeEnable: true,
        zoom: 12,
        center: [111.672775, 40.822078]
    });
    this.map.on('complete', () => {
    });
    this.map.on('click', (p) => {
        // LOG(p.lnglat);
    });
    for (let i = 0; i < this.initStack.length; i++) {
        this.initStack[i](this, this.map, window.AMap);
    }
    this.initStack = [];
};
methods._ = function (callback) {
    if (this.map) {
        return callback(this, this.map, window.AMap);
    } else {
        this.initStack.push(callback);
    }
};
const computed = {};
const created = function () {};
const mounted = function () {
    this.polygonHolder = {};
    this.markerHolder = {};
    this.loadMap(this.init);
};
const beforeDestroy = function () {
    if (this.map) {
        this.map.destroy();
        this.map = null;
    }
};
const dataFunc = function () {
    const o = {
        initStack: []
    };
    return o;
};
export default {
    data: dataFunc,
    created,
    methods,
    computed,
    props: [],
    mounted,
    mixins: [],
    beforeDestroy,
    components: {}
};
</script>

<style scoped lang="less">
.comp-amap {
    min-height: 10px;
}
</style>
