const tool = require('util/tool');
const planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
const planeColor = '#6C97ED';
const getTooltipDotHtml = function (color) {
    if (typeof color === 'object' && color.color) {
        color = color.color;
    }
    let style = [
        'display:inline-block',
        'margin-right: 5px',
        'border-radius: 10px',
        'width: 9px',
        'height:9px',
        'background-color:' + color
    ].join(';')
    return '<span style="' + style + '"></span> ';
};
const EC = {
    getTooltipDotHtml
};
// 饼图
EC.getPieSeries = function (o) {
    return tool.extend({
        type: 'pie',
        // startAngle: 0,
        center: ['50%', '55%'],
        radius: [55, 75],
        minAngle: 10,
        label: {
            position: 'outside'
        },
        labelLine: {
            length: 8,
            length2: 3
        }
    }, o);
};
EC.getPieTooltip = function (o) {
    return tool.extend({
        confine: true,
        formatter: (p) => {
            return this.getTooltipDotHtml(p)
                + p.name + '：' + p.value
                + ' (' + p.percent + '%)';
        }
    }, o);
};
// 柱状图tooltip
EC.getBarTooltip = function() {
    return {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    }
};
// 词云
EC.getWordCloudSeries = function (o) {
    return tool.extend({
        type: 'wordCloud',
        gridSize: 4,
        sizeRange: [16, 50],
        rotationRange: [-45, 45],
        shape: 'pentagon',
        drawOutOfBound: false,
        textStyle: {
            normal: {
                color: function () {
                    return 'rgb(' + [
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160)
                    ].join(',') + ')';
                }
            },
            emphasis: {
                shadowBlur: 10,
                shadowColor: '#333'
            }
        }
    }, o);
};
// areaStyle.color 渐变
EC.getChartAreaGradient = function (fromColor, toColor) {
    return  {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
            offset: 0, color: fromColor || '#666666'
        }, {
            offset: 1, color: toColor || '#ffffff'
        }]
    }
};
// 折线图：最大最小 markPoint: this.getMinMaxMarkPoint()
EC.getMinMaxMarkPoint = function () {
    return {
        data: [
            {type: 'max', name: '最大值'},
            {type: 'min', name: '最小值'}
        ]
    }
};
// 桑基图
EC.getSankeyChartOption = function (o) {
    return tool.extend({
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series: [{
            type: 'sankey',
            layout: 'none',
            itemStyle: {
                normal: {
                    borderWidth: 1,
                    borderColor: '#aaa'
                }
            },
            lineStyle: {
                normal: {
                    color: 'source',
                    curveness: 0.5
                }
            }
        }]
    }, o);
};
// 地理
EC.getChartGeo = function (o, options = {}) {
    return tool.extend({
        map: 'china',
        top: '12%',
        left: 20,
        right: 20,
        roam: true,
        label: {
            emphasis: {
                show: false
            }
        },
        itemStyle: {
            normal: {
                areaColor: options.areaColor || '#667491',
                borderColor: options.borderColor || '#ffffff'
            },
            emphasis: {
                areaColor: options.hoverAreaColor || '#2a333d',
            }
        }
    }, o)
};
// 地图 圆圈波纹
EC.getGeoCircleBorderOption = function (o, itemColor = '#FF799D') {
    /*
    o.data = data.map((item) => {
        return {
            name: item.cityDesc,
            value: [
                item.province_clogiitud, item.province_clatitude, item.userNum
            ]
        };
    });
    */
    return tool.extend({
        type: 'effectScatter',
        coordinateSystem: 'geo',
        symbolSize: function (val) {
            let v = val[2];
            let MIN = 8;
            let ratio = 5;
            return Math.max(Math.sqrt(v) / ratio, MIN);
        },
        showEffectOn: 'render',
        rippleEffect: {
            brushType: 'stroke'
        },
        hoverAnimation: true,
        tooltip: {
            formatter: (p) => {
                return p.marker + p.name + '：' + p.value[2];
            }
        },
        label: {
            normal: {
                fontWeight: 'lighter',
                formatter: '{b}',
                position: 'right',
                color: '#eee',
                show: true
            }
            
        },
        itemStyle: {
            normal: {
                color: itemColor,
                shadowBlur: 10,
                shadowColor: itemColor
            }
        },
        zlevel: 4
    }, o)
};
// 飞机轨迹的尾巴
EC.getPlaneTrailSeries = function (o, color = planeColor) {
    /**
     * var fromCoord = [item.province_clogiitud, item.province_clatitude];
     * var toCoord = [item.scenery_clogiitud, item.scenery_clatitude];
     * o.data = [{coord: fromCoord}, {coord: toCoord}];
     */
    return tool.extend({
        type: 'lines',
        zlevel: 2,
        effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: '#fff',
            symbolSize: 3
        },
        lineStyle: {
            normal: {
                color,
                width: 0,
                curveness: 0.2
            }
        }
    }, o)
};
// 飞机轨迹
EC.getPlaneFlySeries = function (o, color = planeColor) {
    /**
     * var fromCoord = [item.province_clogiitud, item.province_clatitude];
     * var toCoord = [item.scenery_clogiitud, item.scenery_clatitude];
     * o.data = [{coord: fromCoord}, {coord: toCoord}];
     */
    return tool.extend({
        type: 'lines',
        zlevel: 3,
        effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: planePath,
            symbolSize: 15
        },
        lineStyle: {
            normal: {
                // 飞机和线的颜色
                color,
                width: 1,
                opacity: 0.4,
                curveness: 0.2
            }
        }
    }, o);
};
module.exports = EC;