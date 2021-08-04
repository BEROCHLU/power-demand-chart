'use strict';

import {
    arrHsh
} from '../src/rowdata.js';

// create echarts instance
const echartsStack = echarts.init(echarts_stack);

let hshPlot = {}
let arrKeys = _.keys(arrHsh[0]);
let arrLegend = _.pull(arrKeys, "月日", "時刻", "需要");
// append series
const arrSeries = _.map(arrLegend, (strLegend) => {
    const hshSeries = {
        name: strLegend,
        type: 'line',
        stack: 'stackA',
        areaStyle: {},
        symbol: 'none',
        lineStyle: {
            width: 0.5
        },
        data: hshPlot[strLegend]
    }
    return hshSeries;
    //optionStack.series.push(hshSeries);
});

const arrAxisX = _.map(arrHsh, (hsh) => {
    const str_day = hsh['月日'];
    const str_h = hsh['時刻'];
    return `${str_day} ${str_h}:00`;
});

// create plot data
_.forEach(arrLegend, (legend) => {
    hshPlot[legend] = _.map(arrHsh, hsh => parseInt(hsh[legend]));
});

const option = {
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: arrLegend
    },
    toolbox: {
        feature: {
            dataView: { // not work IE11
                title: 'data view',
                readOnly: true,
                lang: ['data view', 'turn off', 'refresh']
            },
            restore: {
                title: 'restore'
            },
            saveAsImage: {
                title: 'saveAsImage'
            }
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '8%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: arrAxisX
    }],
    yAxis: [{
        type: 'value'
    }],
    animation: false,
    dataZoom: [{
        type: 'inside',
        start: 0,
        end: 100
    }, {
        show: true,
        type: 'slider',
        throttle: 200,
        start: 0,
        end: 100
    }],
    series: [{
            name: arrLegend[0],
            type: 'line',
            stack: 'stackA',
            areaStyle: {},
            symbol: 'none',
            lineStyle: {
                width: 1
            },
            data: hshPlot[arrLegend[0]]
        },
        {
            name: arrLegend[1],
            type: 'line',
            stack: 'stackA',
            areaStyle: {},
            symbol: 'none',
            lineStyle: {
                width: 1
            },
            data: hshPlot[arrLegend[1]]
        },
        {
            name: arrLegend[2],
            type: 'line',
            stack: 'stackA',
            areaStyle: {},
            symbol: 'none',
            lineStyle: {
                width: 1
            },
            data: hshPlot[arrLegend[2]]
        },
        {
            name: arrLegend[3],
            type: 'line',
            stack: 'stackA',
            areaStyle: {},
            symbol: 'none',
            lineStyle: {
                width: 1
            },
            data: hshPlot[arrLegend[3]]
        },
        {
            name: arrLegend[4],
            type: 'line',
            stack: 'stackA',
            areaStyle: {},
            symbol: 'none',
            lineStyle: {
                width: 1
            },
            data: hshPlot[arrLegend[4]]
        },
        {
            name: arrLegend[5],
            type: 'line',
            stack: 'stackA',
            areaStyle: {},
            symbol: 'none',
            lineStyle: {
                width: 1
            },
            data: hshPlot[arrLegend[5]]
        },
        {
            name: arrLegend[6],
            type: 'line',
            stack: 'stackA',
            areaStyle: {},
            symbol: 'none',
            lineStyle: {
                width: 1
            },
            data: hshPlot[arrLegend[6]]
        },
        {
            name: arrLegend[7],
            type: 'line',
            stack: 'stackA',
            areaStyle: {},
            symbol: 'none',
            lineStyle: {
                width: 1
            },
            data: hshPlot[arrLegend[7]]
        },
        {
            name: arrLegend[8],
            type: 'line',
            stack: 'stackA',
            areaStyle: {},
            symbol: 'none',
            lineStyle: {
                width: 1
            },
            data: hshPlot[arrLegend[8]]
        },
        {
            name: arrLegend[9],
            type: 'line',
            stack: 'stackA',
            areaStyle: {},
            symbol: 'none',
            lineStyle: {
                width: 1
            },
            data: hshPlot[arrLegend[9]]
        }
    ]
}

// draw a chart
echartsStack.setOption(option);