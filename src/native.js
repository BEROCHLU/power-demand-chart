'use strict';

import {
    arrHsh
} from './rowdata.js';

//import '../css/style.css';

// create echarts instance
let echartsHeatmap = echarts.init(cn2);
let echartsLine = echarts.init(cn3);
let echartsStack = echarts.init(cn4);

const arrX = _.chain(arrHsh).map(hsh => hsh['月日']).uniq().value();
const arrY = _.map(_.range(24), String);

let hshPlot = {}
let arrKeys = _.keys(arrHsh[0]);
let arrLegend = _.pull(arrKeys, "月日", "時刻", "需要");

// create option innerText
_.forEach(arrLegend, (strLegend) => {
    const elem = document.createElement('option');
    elem.innerText = strLegend;
    data_selector.appendChild(elem);
});

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
    //optionStack.series.push(hshSeries);
});

//1st value of option
const _str1st = document.querySelector('#data_selector > option').innerText;

let arrAxisY = [];
let arrAxisX = [];
// [x, y, z]
// [0-23, 0-30, value]
let arrPlot = _.map(arrHsh, (hsh, i) => {

    const int_day = parseInt(i / 24);
    const int_hour = parseInt(hsh['時刻']);
    const int_value = parseInt(hsh[_str1st]);
    const str_day = hsh['月日'];
    const str_h = hsh['時刻'];
    const str_xAxis = `${str_day} ${str_h}:00`;

    arrAxisX.push(str_xAxis);
    arrAxisY.push(int_value);

    return [int_day, int_hour, int_value || '-'];
});

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
            type: 'slider',
            bottom: '1%',
            throttle: 200,
            start: 0,
            end: 100
        }
    ],
    animation: false,
    series: [{
        data: arrAxisY,
        symbol: 'none',
        type: 'line' //line | bar
    }]
}

const optionStack = {
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
        throttle: 200,
        start: 0,
        end: 100
    }],
    series: arrSeries
}



// draw a chart
echartsHeatmap.setOption(optionHeatmap);
echartsLine.setOption(optionLine);
echartsStack.setOption(optionStack);

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
    echartsHeatmap.clear();
    optionHeatmap.visualMap.min = _.min(arrAxisY);
    optionHeatmap.visualMap.max = _.max(arrAxisY);
    optionHeatmap.series[0].data = arrPlot;

    echartsHeatmap.setOption(optionHeatmap);
}

const reDrawLine = () => {
    echartsLine.clear();
    optionLine.xAxis.data = arrAxisX;
    optionLine.series[0].data = arrAxisY;

    echartsLine.setOption(optionLine, true);
}