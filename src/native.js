'use strict';

import {
    arrHsh
} from './rowdata-all.mjs';

//import '../css/ms-style.css';

if (window.dayjs_plugin_isBetween) {
    dayjs.extend(window.dayjs_plugin_isBetween); //install dayjs-plugin from browser
} else {
    dayjs.extend(isBetween); //node.js
}

// create echarts instance
const echartsHeatmap = echarts.init(cn2);
const echartsLine = echarts.init(cn3);
const echartsStack = echarts.init(cn5);
const echartsLineA = echarts.init(cn22);

const optionHeatmap = {
    tooltip: {
        formatter: (p) => {
            return `${p.name} ${p.value[1]}:00 <br> ${p.value[2]}`;
        },
        position: 'right'
    },
    animation: false,
    grid: {
        height: '90%',
        width: '70%',
        top: '3%'
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
                if (param.seriesName === '需要') return;
                sum += param.value;
            });

            s += `<div style="overflow: hidden;"><div>合計（需要除く）</div><span style="float: right;"><b>${_.round(sum, 1)}</b></span></div></div>`;
            return s;
        }
    },
    legend: {
        data: null,
        selector: true,
        selected: {
            '需要': false,
            '揚水': false
        }
    },
    color: ['#800080', '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#008000'],
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

class SetupChart {
    constructor() {
        const arrStrDateUniq = _.chain(arrHsh).map(hsh => {
            return dayjs(hsh['月日']).format('YYYY-MM');
        }).uniq().value();

        _.forEach(arrStrDateUniq, (strOption) => { // create option innerText & value
            const elem = document.createElement('option');
            elem.innerText = strOption;
            elem.value = strOption;

            const arrDom = [ym_selector1, ym_selector2a, ym_selector2b, ym_selector3a, ym_selector3b];
            _.forEach(arrDom, dom => {
                dom.appendChild(elem.cloneNode(true));
            });
        });
    }

    setarrFilter() {
        const mStart = dayjs(ym_selector1.value);
        this.arrFilter = _.filter(arrHsh, hsh => {
            return dayjs(hsh['月日']).isBetween(mStart, mStart, 'month', '[]');
        });
    }

    setarrLegend() { // create option innerText & value
        const arrKeys = _.keys(this.arrFilter[0]);
        let arrOption = _.pull(arrKeys, "月日", "時刻");
        this.arrLegend = _.cloneDeep(arrOption); //deep copy
        _.forEach(arrOption, (strOption) => {
            const elem = document.createElement('option');
            elem.innerText = strOption;
            elem.value = strOption;

            const elem2 = elem.cloneNode(true);
            data_selector1.appendChild(elem);
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
            const int_value = hsh[data_selector1.value]; //1st value of option

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

        const n = _.sum(hshAxis.arrAxisY);
        document.querySelector('.numeric').innerText = math.unit(n, 'MWh').format(3);
    }

    setStack() {
        this.hshLegendSelect = optionStack.legend.selected //selected legends
        let arrAxisXStack = [];

        _.forEach(this.arrFilter, hsh => {
            const str_day = hsh['月日'];
            const str_h = hsh['時刻'];
            const str_xAxis = `${str_day} ${str_h}:00`;

            arrAxisXStack.push(str_xAxis);
        });

        let hshStack = {}
        this.arrSeriesStack = _.map(this.arrLegend, strLegend => {
            hshStack[strLegend] = _.map(this.arrFilter, hsh => hsh[strLegend]);

            return {
                name: strLegend,
                type: 'line',
                stack: (strLegend === '需要') ? 'stackB' : 'stackA',
                areaStyle: {},
                symbol: 'none',
                lineStyle: {
                    width: 0.5
                },
                data: hshStack[strLegend]
            }
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

        _.forEach(this.arrFilter, hsh => {
            const int_yAxis = hsh[data_selector2.value];
            const str_xAxis = `${hsh['月日']} ${hsh['時刻']}:00`;

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
        const n = _.sum(hshAxis.arrAxisY);
        document.querySelector('.numeric').innerText = math.unit(n, 'MWh').format(3);
    }

    reDrawStack(arrAxisXStack) {
        echartsStack.clear();
        optionStack.xAxis[0].data = arrAxisXStack;
        optionStack.series = this.arrSeriesStack;
        optionStack.legend.selected = this.hshLegendSelect;

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

echartsStack.on('legendselectchanged', params => {
    setupchart.hshLegendSelect = params.selected;
});
echartsStack.on('legendselectall', params => {
    setupchart.hshLegendSelect = params.selected;
});
echartsStack.on('legendinverseselect', params => {
    setupchart.hshLegendSelect = params.selected;
});
// button click
period_button.addEventListener('click', () => {
    const mStart = dayjs(ym_selector1.value);
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
        const int_value = hsh[data_selector1.value];

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
    const mStart = dayjs(ym_selector2a.value);
    const mEnd = dayjs(ym_selector2b.value);
    setupchart.arrFilter = _.filter(arrHsh, hsh => {
        return dayjs(hsh['月日']).isBetween(mStart, mEnd, 'month', '[]');
    });

    let hshAxis = {
        arrAxisX: [],
        arrAxisY: []
    }

    _.forEach(setupchart.arrFilter, hsh => {
        const int_yAxis = hsh[data_selector2.value];
        const str_xAxis = `${hsh['月日']} ${hsh['時刻']}:00`;

        hshAxis.arrAxisX.push(str_xAxis);
        hshAxis.arrAxisY.push(int_yAxis);
    });

    //re-draw
    setupchart.reDrawLineA(hshAxis);
});

// button click
period_button3.addEventListener('click', () => {
    const mStart = dayjs(ym_selector3a.value);
    const mEnd = dayjs(ym_selector3b.value);
    setupchart.arrFilter = _.filter(arrHsh, hsh => {
        return dayjs(hsh['月日']).isBetween(mStart, mEnd, 'month', '[]');
    });

    let hshStack = {}
    _.forEach(setupchart.arrLegend, strLegend => {
        hshStack[strLegend] = _.map(setupchart.arrFilter, hsh => hsh[strLegend]);
    });
    setupchart.arrSeriesStack = _.map(setupchart.arrLegend, strLegend => {
        return {
            name: strLegend,
            type: 'line',
            stack: (strLegend === '需要') ? 'stackB' : 'stackA',
            areaStyle: {},
            symbol: 'none',
            lineStyle: {
                width: 0.5
            },
            data: hshStack[strLegend]
        }
    });

    let arrAxisXStack = _.map(setupchart.arrFilter, hsh => {
        return `${hsh['月日']} ${hsh['時刻']}:00`;
    });
    //re-draw
    setupchart.reDrawStack(arrAxisXStack);
});