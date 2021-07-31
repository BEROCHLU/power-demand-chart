'use strict';

import {
    arrHsh
} from './rowdata.js';

// create echarts instance
const echartsHeatmap = echarts.init(document.getElementById('cn2'));
const echartsLine = echarts.init(document.getElementById('cn3'));

let arrAxisY = [];
let arrAxisX = [];

// [x, y, z]
// [0-23, 0-30, value]
let arrPlot = _.map(arrHsh, (hsh, i) => {

    const int_day = parseInt(i / 24);
    const int_hour = parseInt(hsh['時刻']);
    const int_value = parseInt(hsh['太陽光実績']);
    const str_day = hsh['月日'];
    const str_h = hsh['時刻'];
    const str_xAxis = `${str_day} ${str_h}:00`;

    arrAxisX.push(str_xAxis);
    arrAxisY.push(int_value);

    return [int_day, int_hour, int_value || '-'];
});

const arrX = _.chain(arrHsh).map(hsh => hsh['月日']).uniq().value();
const arrY = _.map(_.range(24), String);

const optionHeatmap = {
    tooltip: {
        formatter: (p) => {
            return `${p.name} ${p.value[1]}:00 <br> ${p.value[2]}`;
        },
        position: 'top'
    },
    animation: false,
    grid: {
        height: '90%',
        width: '70%',
        top: '5%'
    },
    xAxis: {
        type: 'category',
        data: arrX,
        splitArea: {
            show: true
        }
    },
    yAxis: {
        type: 'category',
        data: arrY,
        splitArea: {
            show: true
        }
    },
    visualMap: {
        min: _.min(arrAxisY),
        max: _.max(arrAxisY),
        calculable: true,
        orient: 'vertical', //horizontal | vertical
        //left: '10%',
        right: '5%',
        bottom: '5%',
        padding: 0
    },
    series: [{
        name: 'power',
        type: 'heatmap',
        data: arrPlot,
        label: {
            show: false
        },
        emphasis: {
            itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    }]
}

const optionLine = {
    tooltip: {
        trigger: 'axis', // item | axis
        position: 'top'
    },
    toolbox: {
        show: true,
        feature: {
            dataView: { // not work IE11
                title: 'data view',
                readOnly: true,
                lang: ['data view', 'turn off', 'refresh']
            },
            magicType: {
                title: {
                    line: 'for line charts',
                    bar: 'for bar charts'
                },
                type: ["line", "bar"]
            },
            restore: {
                title: 'restore'
            },
            saveAsImage: {
                title: 'save as image'
            }
        }
    },
    xAxis: {
        type: 'category',
        data: arrAxisX
    },
    yAxis: {
        type: 'value'
    },
    dataZoom: [{
            type: 'inside',
            start: 0,
            end: 100
        },
        {
            show: true,
            type: 'slider',
            bottom: '1%',
            throttle: 128,
            start: 0,
            end: 100
        }
    ],
    animation: false,
    series: [{
        data: arrAxisY,
        symbol: 'circle',
        symbolSize: 4,
        type: 'line' //line | bar
    }]
}
// draw a chart
echartsHeatmap.setOption(optionHeatmap);
echartsLine.setOption(optionLine);

data_selector.addEventListener('change', (event) => {

    const strSelect = event.target.value;
    arrAxisX = [];
    arrAxisY = [];

    arrPlot = _.map(arrHsh, (hsh, i) => {
        const int_day = parseInt(i / 24);
        const int_hour = parseInt(hsh['時刻']);
        const int_value = parseInt(hsh[strSelect]);
        const str_day = hsh['月日'];
        const str_h = hsh['時刻'];
        const str_xAxis = `${str_day} ${str_h}:00`;

        arrAxisX.push(str_xAxis);
        arrAxisY.push(int_value);

        return [int_day, int_hour, int_value || '-'];
    });
    //re-draw
    reDrawLine();
    reDrawHeat();
});

const reDrawHeat = () => {
    //echartsHeatmap.clear();
    optionHeatmap.visualMap.min = _.min(arrAxisY);
    optionHeatmap.visualMap.max = _.max(arrAxisY);
    optionHeatmap.series[0].data = arrPlot;

    echartsHeatmap.setOption(optionHeatmap);
}

const reDrawLine = () => {
    //echartsLine.clear();
    optionLine.xAxis.data = arrAxisX;
    optionLine.series[0].data = arrAxisY;

    echartsLine.setOption(optionLine);
}