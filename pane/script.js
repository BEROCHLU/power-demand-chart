'use strict';

import {
    arrHsh
} from '../src/rowdata.js';

// create echarts instance
const echartsStack = echarts.init(echarts_stack);

let hshPlot = {}
let arrLegend = ['太陽光実績', '地熱', '水力', '風力実績', '原子力', '火力', 'バイオマス', '風力抑制量', '太陽光抑制量'];

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
        bottom: '3%',
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
        bottom: '1%',
        throttle: 128,
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
        }
    ]
}

// draw a chart
echartsStack.setOption(option);