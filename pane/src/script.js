'use strict';

import {
    arrHsh
} from '../src/rowdata.js';

// create echarts instance
const echartsStack = echarts.init(echarts_stack);

let hshPlot = {}
let arrKeys = _.keys(arrHsh[0]);
let arrLegend = _.pull(arrKeys, "月日", "時刻", "需要");

// create plot data
_.forEach(arrLegend, (strLegend) => {
    hshPlot[strLegend] = _.map(arrHsh, hsh => parseInt(hsh[strLegend]));
});

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
});

// crate axisX
const arrAxisX = _.map(arrHsh, (hsh) => {
    const str_day = hsh['月日'];
    const str_h = hsh['時刻'];
    return `${str_day} ${str_h}:00`;
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
        },
        formatter: (arrParam) => {
            let s = `<div style="width: 150px;"><div>${arrParam[0].name}</div>`;
            let sum = 0;
            _.forEach(arrParam, (param) => {
                s += `<div style="overflow: hidden;">${param.marker}${param.seriesName}<span style="float: right;"><b>${param.value}</b></span></div>`;
                sum += param.value;
            });

            s += `<div style="overflow: hidden;">合計<span style="float: right;"><b>${sum}</b></span></div></div>`;
            //console.log(sum);
            //s += `</div>`;
            //console.log(s);
            return s;
        }
    },
    legend: {
        data: arrLegend,
        selector: true,
        selected: {
            '揚水': false
        }
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
        bottom: '6%',
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
    series: arrSeries
}

// draw a chart
echartsStack.setOption(option);