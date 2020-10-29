'use strict';

import {
  arrHsh
} from './rowdata.js';

import "../css/style.css";

const arrX = _.chain(arrHsh).map(hsh => hsh['月日']).uniq().value();
const arrY = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];

let arrMaxin = [];
let arrAxisX = [];

// [x, y, z]
// [0-23, 0-30, value]
const arrPlot = _.map(arrHsh, (hsh, i) => {

    const int_day = parseInt(i / 24);
    const int_hour = parseInt(hsh['時刻']);
    const int_value = parseInt(hsh['太陽光実績']);
    const str_day = hsh['月日'];
    const str_h = hsh['時刻'];
    const str_xAxis = `${str_day} ${str_h}:00`;

    arrAxisX.push(str_xAxis);
    arrMaxin.push(int_value);

    return [int_day, int_hour, int_value || '-'];
});

const myChart1 = echarts.init(document.getElementById('cn1'));
const myChart2 = echarts.init(document.getElementById('cn2'));

const option1 = {
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
        min: _.min(arrMaxin),
        max: _.max(arrMaxin),
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

const option2 = {
    tooltip: {
        trigger: 'axis', // item | axis
        position: 'top'
    },
    toolbox: {
        show: true,
        feature: {
            dataView: {
                title: 'data view',
                readOnly: true
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
    series: [{
        data: arrMaxin,
        symbol: 'circle',
        symbolSize: 4,
        type: 'line' //line | bar
    }]
};

myChart1.setOption(option1);
myChart2.setOption(option2);