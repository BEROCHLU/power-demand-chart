'use strict';

import {
    arrHsh
} from './rowdata-all.mjs';

//import '../css/style.css';

if (window.dayjs_plugin_isBetween) {
    dayjs.extend(window.dayjs_plugin_isBetween); //install dayjs-plugin from browser
} else {
    dayjs.extend(isBetween);
}

// create echarts instance
const echartsHeatmap = echarts.init(cn2);
const echartsLine = echarts.init(cn3);
const echartsStack = echarts.init(cn5);
const echartsLineA = echarts.init(cn22);

class SetupChart {
    constructor() {
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
        //set LineA
        _.forEach(arrHsh, hsh => {
            const int_yAxis = hsh["需要"];
            const str_day = hsh['月日'];
            const str_h = hsh['時刻'];
            const str_xAxis = `${str_day} ${str_h}:00`;

            hshLineA.arrAxisX.push(str_xAxis);
            hshLineA.arrAxisY.push(int_yAxis);
        });
    }

    setarrFilter() {
        const mStart = dayjs(ym_selector.value);
        this.arrFilter = _.filter(arrHsh, hsh => {
            return dayjs(hsh['月日']).isBetween(mStart, mStart, 'month', '[]');
        });
    }

    setarrLegend() {
        // create option innerText & value
        const arrKeys = _.keys(this.arrFilter[0]);
        let arrOption = _.pull(arrKeys, "月日", "時刻", "需要");
        this.arrLegend = _.cloneDeep(arrOption); //deep copy
        arrOption.push("需要");
        _.forEach(arrOption, (strOption) => {
            const elem = document.createElement('option');
            elem.innerText = strOption;
            elem.value = strOption;

            const elem2 = elem.cloneNode(true);
            data_selector.appendChild(elem);
            data_selector2.appendChild(elem2);
        });
    }

    setarrPlotHeat() {
        // [x, y, z] = [0-30, 0-23, value]
        this.arrPlotHeat = _.map(this.arrFilter, (hsh, i) => {
            const int_day = parseInt(i / 24);
            const int_hour = hsh['時刻'];
            const int_value = hsh[data_selector.value]; //1st value of option

            const str_day = hsh['月日'];
            const str_h = hsh['時刻'];
            const str_xAxis = `${str_day} ${str_h}:00`;

            arrAxisX.push(str_xAxis);
            arrAxisY.push(int_value);
            arrAxisXStack.push(str_xAxis);

            return [int_day, int_hour, int_value || '-'];
        });
    }

    setStack() {
        // append series
        this.hshStack = {}
        this.arrSeriesStack = _.map(this.arrLegend, (strLegend) => {
            this.hshStack[strLegend] = _.map(this.arrFilter, hsh => hsh[strLegend]);
            const hshSeries = {
                name: strLegend,
                type: 'line',
                stack: 'stackA',
                areaStyle: {},
                symbol: 'none',
                lineStyle: {
                    width: 0.5
                },
                data: this.hshStack[strLegend]
            }
            return hshSeries;
        });
    }

    reDrawHeat() {
        echartsHeatmap.clear();
        optionHeatmap.visualMap.min = _.min(arrAxisY);
        optionHeatmap.visualMap.max = _.max(arrAxisY);
        optionHeatmap.series[0].data = this.arrPlotHeat;
        optionHeatmap.xAxis.data = _.chain(this.arrFilter).map(hsh => hsh['月日']).uniq().value();

        echartsHeatmap.setOption(optionHeatmap);
    }

    reDrawLine() {
        echartsLine.clear();
        optionLine.xAxis.data = arrAxisX;
        optionLine.series[0].data = arrAxisY;

        echartsLine.setOption(optionLine, true);
    }

    reDrawStack() {
        echartsStack.clear();
        optionStack.xAxis[0].data = arrAxisXStack;
        optionStack.series = this.arrSeriesStack;

        echartsStack.setOption(optionStack, true);
    }
}

let arrAxisX = [];
let arrAxisY = [];
let arrAxisXStack = [];
let hshLineA = {
    arrAxisX: [],
    arrAxisY: []
}

const setupchart = new SetupChart();
setupchart.setarrFilter();
setupchart.setarrLegend();
setupchart.setarrPlotHeat();
setupchart.setStack();

const arrAxisXHeat = _.chain(setupchart.arrFilter).map(hsh => hsh['月日']).uniq().value();
const arrAxisYHeat = _.map(_.range(24), String);

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
        data: arrAxisXHeat,
        splitArea: {
            show: true
        }
    },
    yAxis: {
        type: 'category',
        data: arrAxisYHeat,
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
        data: setupchart.arrPlotHeat,
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
        data: setupchart.arrLegend,
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
        data: arrAxisXStack
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
    series: setupchart.arrSeriesStack
}

const optionLineA = {
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
        data: hshLineA.arrAxisX
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
        data: hshLineA.arrAxisY,
        symbol: 'none',
        type: 'line' //line | bar
    }]
}
// draw a chart
echartsHeatmap.setOption(optionHeatmap);
echartsLine.setOption(optionLine);
echartsStack.setOption(optionStack);
echartsLineA.setOption(optionLineA);

// button click
period_button.addEventListener('click', () => {
    const mStart = dayjs(ym_selector.value);
    setupchart.arrFilter = _.filter(arrHsh, hsh => {
        return dayjs(hsh['月日']).isBetween(mStart, mStart, 'month', '[]');
    });

    arrAxisX = [];
    arrAxisY = [];

    setupchart.arrPlotHeat = _.map(setupchart.arrFilter, (hsh, i) => {
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
    setupchart.reDrawLine();
    setupchart.reDrawHeat();
});

// button click
period_button2.addEventListener('click', () => {
    const mStart = dayjs(ym_selector2.value);
    setupchart.arrFilter = _.filter(arrHsh, hsh => {
        return dayjs(hsh['月日']).isBetween(mStart, mStart, 'month', '[]');
    });

    _.forEach(setupchart.arrLegend, (strLegend) => {
        setupchart.hshStack[strLegend] = _.map(setupchart.arrFilter, hsh => hsh[strLegend]);
    });
    setupchart.arrSeriesStack = _.map(setupchart.arrLegend, (strLegend) => {
        const hshSeries = {
            name: strLegend,
            type: 'line',
            stack: 'stackA',
            areaStyle: {},
            symbol: 'none',
            lineStyle: {
                width: 0.5
            },
            data: setupchart.hshStack[strLegend]
        }
        return hshSeries;
    });

    arrAxisXStack = [];

    _.forEach(setupchart.arrFilter, hsh => {
        const str_day = hsh['月日'];
        const str_h = hsh['時刻'];
        const str_xAxis = `${str_day} ${str_h}:00`;

        arrAxisXStack.push(str_xAxis);
    });
    //re-draw
    setupchart.reDrawStack();
});