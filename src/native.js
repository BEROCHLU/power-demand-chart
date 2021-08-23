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
        data: null
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
        data: null,
        symbol: 'none',
        type: 'line' //line | bar
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
        data: null
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
        data: null,
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
        data: null,
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
        data: null
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
    series: null
}

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
        data: null,
        splitArea: {
            show: true
        }
    },
    yAxis: {
        type: 'category',
        data: null,
        splitArea: {
            show: true
        }
    },
    visualMap: {
        min: null,
        max: null,
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
        data: null,
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
            //イテレーターを使ってもっとスマートに
            const elem2 = elem.cloneNode(true);
            const elem3 = elem.cloneNode(true);
            const elem4 = elem.cloneNode(true);
            ym_selector.appendChild(elem);
            ym_selector2.appendChild(elem2);
            ym_selector3.appendChild(elem3);
            ym_selector4.appendChild(elem4);
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
        let hshAxis = {
            arrAxisX: [],
            arrAxisY: []
        }
        // [x, y, z] = [0-30, 0-23, value]
        this.arrPlotHeat = _.map(this.arrFilter, (hsh, i) => {
            const int_day = parseInt(i / 24);
            const int_hour = hsh['時刻'];
            const int_value = hsh[data_selector.value]; //1st value of option

            const str_day = hsh['月日'];
            const str_h = hsh['時刻'];
            const str_xAxis = `${str_day} ${str_h}:00`;

            hshAxis.arrAxisX.push(str_xAxis);
            hshAxis.arrAxisY.push(int_value);

            return [int_day, int_hour, int_value || '-'];
        });

        optionLine.xAxis.data = hshAxis.arrAxisX;
        optionLine.series[0].data = hshAxis.arrAxisY;

        optionHeatmap.xAxis.data = _.chain(this.arrFilter).map(hsh => hsh['月日']).uniq().value();
        optionHeatmap.yAxis.data = _.map(_.range(24), String);
        optionHeatmap.visualMap.min = _.min(hshAxis.arrAxisY);
        optionHeatmap.visualMap.max = _.max(hshAxis.arrAxisY);
        optionHeatmap.series[0].data = this.arrPlotHeat;
    }

    setStack() {
        let arrAxisXStack = [];

        _.forEach(setupchart.arrFilter, hsh => {
            const str_day = hsh['月日'];
            const str_h = hsh['時刻'];
            const str_xAxis = `${str_day} ${str_h}:00`;

            arrAxisXStack.push(str_xAxis);
        });

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

        optionStack.xAxis[0].data = arrAxisXStack;
        optionStack.series = this.arrSeriesStack;
        optionStack.legend.data = this.arrLegend;
    }

    setLineA() {
        let hshAxis = {
            arrAxisX: [],
            arrAxisY: []
        }

        _.forEach(arrHsh, hsh => {
            const int_yAxis = hsh[data_selector2.value];
            const str_day = hsh['月日'];
            const str_h = hsh['時刻'];
            const str_xAxis = `${str_day} ${str_h}:00`;

            hshAxis.arrAxisX.push(str_xAxis);
            hshAxis.arrAxisY.push(int_yAxis);
        });

        optionLineA.xAxis.data = hshAxis.arrAxisX;
        optionLineA.series[0].data = hshAxis.arrAxisY;
    }

    reDrawHeat(hshAxis) {
        echartsHeatmap.clear();
        optionHeatmap.visualMap.min = _.min(hshAxis.arrAxisY);
        optionHeatmap.visualMap.max = _.max(hshAxis.arrAxisY);
        optionHeatmap.series[0].data = this.arrPlotHeat;
        optionHeatmap.xAxis.data = _.chain(this.arrFilter).map(hsh => hsh['月日']).uniq().value();

        echartsHeatmap.setOption(optionHeatmap);
    }

    reDrawLine(hshAxis) {
        echartsLine.clear();
        optionLine.xAxis.data = hshAxis.arrAxisX;
        optionLine.series[0].data = hshAxis.arrAxisY;

        echartsLine.setOption(optionLine, true);
    }

    reDrawStack(arrAxisXStack) {
        echartsStack.clear();
        optionStack.xAxis[0].data = arrAxisXStack;
        optionStack.series = this.arrSeriesStack;

        echartsStack.setOption(optionStack, true);
    }

    reDrawLineA(hshAxis) {
        echartsLineA.clear();
        optionLineA.xAxis.data = hshAxis.arrAxisX;
        optionLineA.series[0].data = hshAxis.arrAxisY;

        echartsLineA.setOption(optionLineA, true);
    }
}

const setupchart = new SetupChart();
setupchart.setarrFilter();
setupchart.setarrLegend();
setupchart.setarrPlotHeat();
setupchart.setStack();
setupchart.setLineA();

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

    let hshAxis = {
        arrAxisX: [],
        arrAxisY: []
    }

    setupchart.arrPlotHeat = _.map(setupchart.arrFilter, (hsh, i) => {
        const int_day = parseInt(i / 24);
        const int_hour = hsh['時刻'];
        const int_value = hsh[data_selector.value];

        const str_day = hsh['月日'];
        const str_h = hsh['時刻'];
        const str_xAxis = `${str_day} ${str_h}:00`;

        hshAxis.arrAxisX.push(str_xAxis);
        hshAxis.arrAxisY.push(int_value);

        return [int_day, int_hour, int_value || '-'];
    });

    //re-draw
    setupchart.reDrawLine(hshAxis);
    setupchart.reDrawHeat(hshAxis);
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

    let arrAxisXStack = [];

    _.forEach(setupchart.arrFilter, hsh => {
        const str_day = hsh['月日'];
        const str_h = hsh['時刻'];
        const str_xAxis = `${str_day} ${str_h}:00`;

        arrAxisXStack.push(str_xAxis);
    });
    //re-draw
    setupchart.reDrawStack(arrAxisXStack);
});

// button click
period_button3.addEventListener('click', () => {
    const mStart = dayjs(ym_selector3.value);
    const mEnd = dayjs(ym_selector4.value);
    setupchart.arrFilter = _.filter(arrHsh, hsh => {
        return dayjs(hsh['月日']).isBetween(mStart, mEnd, 'month', '[]');
    });

    let hshAxis = {
        arrAxisX: [],
        arrAxisY: []
    }

    _.forEach(setupchart.arrFilter, hsh => {
        const int_yAxis = hsh[data_selector2.value];
        const str_day = hsh['月日'];
        const str_h = hsh['時刻'];
        const str_xAxis = `${str_day} ${str_h}:00`;

        hshAxis.arrAxisX.push(str_xAxis);
        hshAxis.arrAxisY.push(int_yAxis);
    });

    //re-draw
    setupchart.reDrawLineA(hshAxis);
});