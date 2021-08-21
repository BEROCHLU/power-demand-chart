'use strict';

import {
    arrHsh
} from './rowdata-all.mjs';

//import '../css/style.css';

// create echarts instance
let echartsHeatmap = echarts.init(cn2);
let echartsLine = echarts.init(cn3);
let echartsStack = echarts.init(cn5);

if (window.dayjs_plugin_isBetween) {
    dayjs.extend(window.dayjs_plugin_isBetween); //install dayjs-plugin from browser
} else {
    dayjs.extend(isBetween);
}

const arrStrDateUniq = _.chain(arrHsh).map(hsh => {
    return dayjs(hsh['月日']).format('YYYY-MM');
}).uniq().value();

// create option innerText & value
_.forEach(arrStrDateUniq, (strOption) => {
    const elem = document.createElement('option');

    elem.innerText = strOption;
    elem.value = strOption;

    const elem2 = elem.cloneNode(true);

    ym_selector.appendChild(elem);
    ym_selector2.appendChild(elem2);
});

const mStart = dayjs(ym_selector.value);
let arrFilter = _.filter(arrHsh, hsh => {
    return dayjs(hsh['月日']).isBetween(mStart, mStart, 'month', '[]');
});

let arrX = _.chain(arrFilter).map(hsh => hsh['月日']).uniq().value();
let arrY = _.map(_.range(24), String);

let hshStack = {}
let arrKeys = _.keys(arrFilter[0]);
let arrOption = _.pull(arrKeys, "月日", "時刻", "需要");
let arrLegend = _.cloneDeep(arrOption); //deep copy
arrOption.push("需要");

// create stack data
_.forEach(arrLegend, (strLegend) => {
    hshStack[strLegend] = _.map(arrFilter, hsh => hsh[strLegend]);
});

// create option innerText & value
_.forEach(arrOption, (strOption) => {
    const elem = document.createElement('option');
    elem.innerText = strOption;
    elem.value = strOption;
    data_selector.appendChild(elem);
});

// append series
let arrSeries = _.map(arrLegend, (strLegend) => {
    const hshSeries = {
        name: strLegend,
        type: 'line',
        stack: 'stackA',
        areaStyle: {},
        symbol: 'none',
        lineStyle: {
            width: 0.5
        },
        data: hshStack[strLegend]
    }
    return hshSeries;
});

let arrAxisY = [];
let arrAxisX = [];
let arrAxisXX = [];
// [x, y, z] = [0-30, 0-23, value]
let arrPlot = _.map(arrFilter, (hsh, i) => {
    const int_day = parseInt(i / 24);
    const int_hour = hsh['時刻'];
    const int_value = hsh[data_selector.value]; //1st value of option

    const str_day = hsh['月日'];
    const str_h = hsh['時刻'];
    const str_xAxis = `${str_day} ${str_h}:00`;

    arrAxisX.push(str_xAxis);
    arrAxisY.push(int_value);
    arrAxisXX.push(str_xAxis);

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
        position: 'top',
        axisPointer: {
            type: 'cross'
        }
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
    grid: {
        top: '7%',
        left: '3%',
        right: '4%',
        bottom: '11%',
        containLabel: true
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
            bottom: '2%',
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
        },
        formatter: (arrParam) => {
            let s = `<div style="width: 150px;"><div>${arrParam[0].name}</div>`;
            let sum = 0;
            _.forEach(arrParam, (param) => {
                s += `<div style="overflow: hidden;">${param.marker}${param.seriesName}<span style="float: right;"><b>${param.value}</b></span></div>`;
                sum += param.value;
            });

            s += `<div style="overflow: hidden;">合計<span style="float: right;"><b>${_.round(sum, 1)}</b></span></div></div>`;
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
        top: '7%',
        left: '3%',
        right: '4%',
        bottom: '11%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: arrAxisXX
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
        bottom: '2%',
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

// button click
period_button.addEventListener('click', () => {
    const mStart = dayjs(ym_selector.value);
    arrFilter = _.filter(arrHsh, hsh => {
        return dayjs(hsh['月日']).isBetween(mStart, mStart, 'month', '[]');
    });

    arrAxisX = [];
    arrAxisY = [];

    arrPlot = _.map(arrFilter, (hsh, i) => {
        const int_day = parseInt(i / 24);
        const int_hour = hsh['時刻'];
        const int_value = hsh[data_selector.value];

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

// button click
period_button2.addEventListener('click', () => {
    const mStart = dayjs(ym_selector2.value);
    arrFilter = _.filter(arrHsh, hsh => {
        return dayjs(hsh['月日']).isBetween(mStart, mStart, 'month', '[]');
    });
    
    _.forEach(arrLegend, (strLegend) => {
        hshStack[strLegend] = _.map(arrFilter, hsh => hsh[strLegend]);
    });
    arrSeries = _.map(arrLegend, (strLegend) => {
        const hshSeries = {
            name: strLegend,
            type: 'line',
            stack: 'stackA',
            areaStyle: {},
            symbol: 'none',
            lineStyle: {
                width: 0.5
            },
            data: hshStack[strLegend]
        }
        return hshSeries;
    });

    arrAxisXX = [];

    _.forEach(arrFilter, hsh => {
        const str_day = hsh['月日'];
        const str_h = hsh['時刻'];
        const str_xAxis = `${str_day} ${str_h}:00`;

        arrAxisXX.push(str_xAxis);
    });
    //re-draw
    reDrawStack();
});

const reDrawHeat = () => {
    echartsHeatmap.clear();
    optionHeatmap.visualMap.min = _.min(arrAxisY);
    optionHeatmap.visualMap.max = _.max(arrAxisY);
    optionHeatmap.series[0].data = arrPlot;
    optionHeatmap.xAxis.data = _.chain(arrFilter).map(hsh => hsh['月日']).uniq().value();

    echartsHeatmap.setOption(optionHeatmap);
}

const reDrawLine = () => {
    echartsLine.clear();
    optionLine.xAxis.data = arrAxisX;
    optionLine.series[0].data = arrAxisY;

    echartsLine.setOption(optionLine, true);
}

const reDrawStack = () => {
    echartsStack.clear();
    optionStack.xAxis[0].data = arrAxisXX;
    optionStack.series = arrSeries;

    echartsStack.setOption(optionStack, true);
}