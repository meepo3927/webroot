<template>
<div class="comp-amap"></div>
</template>

<script>
import amapUtil from 'util/amap.js';
const methods = {};
methods.init = function (AMap) {
    const map = this.map = new AMap.Map(this.$el, {
        esizeEnable: true,
        zoom: 12,
        center: [111.672775, 40.822078]
    });
    this.map.on('complete', () => {
        this.isMapCompleted = true;
        for (let i = 0; i < this.initStack.length; i++) {
            this.initStack[i](this, this.map, window.AMap);
        }
        this.initStack = [];
    });
    this.map.on('click', (p) => {
        // LOG(p.lnglat);
    });
};
methods._ = function (callback) {
    if (this.isMapCompleted) {
        return callback(this, this.map, window.AMap);
    } else {
        this.initStack.push(callback);
    }
};
// 添加工具条
methods.addToolbar = function (options) {
    const o = Tool.extend({
        position: 'LB'
    }, options);
    AMap.plugin(['AMap.ToolBar'], () => {
        this.map.addControl(new AMap.ToolBar(o));
    });
};
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
methods.getMarkerById = function (id) {
    return this.markerHolder[id];
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
methods.getPolygonById = function (id) {
    return this.polygonHolder[id];
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
// 获取当前位置
methods.getCurrentPosition = function (options, onComplete, onError) {
    const map = this.map;
    map.plugin('AMap.Geolocation', function () {
        const o = Tool.extend({
            enableHighAccuracy: true,
            showButton: true,
            showMarker: true,
            showCircle: true,
            panToLocation: false,
            zoomToAccuracy: false
        }, options);
        const geo = new AMap.Geolocation(o);
        map.addControl(geo);
        geo.getCurrentPosition();
        AMap.event.addListener(geo, 'complete', onComplete);
        AMap.event.addListener(geo, 'error', onError);
    });
};
methods.addInfoWindow = function (elem, point, options) {
    const p = Tool.extend({
        closeWhenClickMap: true,
        isCustom: true,
        content: elem
    }, options);
    const infoWindow = new AMap.InfoWindow(p);
    infoWindow.open(this.map, point);
    return infoWindow;
};
methods.addCompWindow = function (Comp, CompData, point, options) {
    const comp = Vue.$newComponent(Comp, CompData);
    const win = this.addInfoWindow(comp.$el, point, options);
    // 地图关闭
    win.on('close', () => {
        Vue.$disposeComponent(comp);
    });
    // 组件关闭
    comp.$once('close', () => {
        win.close();
    });
    return {comp, win};
};
const computed = {};
const created = function () {};
const mounted = function () {
    this.polygonHolder = {};
    this.markerHolder = {};
    amapUtil.load(this.init);
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
