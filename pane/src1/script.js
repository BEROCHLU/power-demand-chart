'use strict';

import {
    arrHsh
} from '../rowdata-all.mjs';


if (window.dayjs_plugin_isBetween) {
    dayjs.extend(window.dayjs_plugin_isBetween); //install dayjs-plugin from browser
} else {
    dayjs.extend(isBetween); //node.js
}

// create echarts instance
const echartsStack = echarts.init(cn5);

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

class SetupChart {
    constructor() {
        const arrStrDateUniq = _.chain(arrHsh).map(hsh => {
            return dayjs(hsh['月日']).format('YYYY-MM');
        }).uniq().value();

        _.forEach(arrStrDateUniq, (strOption) => { // create option innerText & value
            const elem = document.createElement('option');
            elem.innerText = strOption;
            elem.value = strOption;

            const arrDom = [ym_selector1, ym_selector2, ym_selector3, ym_selector4, ym_selector5];
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

    setStack() {
        this.hshLegendSelect = optionStack.legend.selected //selected legends
        let arrAxisXStack = [];

        _.forEach(setupchart.arrFilter, hsh => {
            const str_day = hsh['月日'];
            const str_h = hsh['時刻'];
            const str_xAxis = `${str_day} ${str_h}:00`;

            arrAxisXStack.push(str_xAxis);
        });

        this.hshStack = {}
        this.arrHshSeries = _.map(this.arrLegend, (strLegend) => {
            let strStack = (strLegend === '需要') ? 'stackB' : 'stackA';
            this.hshStack[strLegend] = _.map(this.arrFilter, hsh => hsh[strLegend]);
            const hshSeries = {
                name: strLegend,
                type: 'line',
                stack: strStack,
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
        optionStack.series = this.arrHshSeries;
        optionStack.legend.data = this.arrLegend;
    }

    setTest() {
        let arr = _.map(this.arrFilter, hsh => {

        });
    }

    reDrawStack(arrAxisXStack) {
        echartsStack.clear();
        optionStack.xAxis[0].data = arrAxisXStack;
        optionStack.series = this.arrHshSeries;
        optionStack.legend.selected = this.hshLegendSelect;

        echartsStack.setOption(optionStack, true);
    }

}

const setupchart = new SetupChart();
setupchart.setarrFilter();
setupchart.setarrLegend();
setupchart.setStack();
setupchart.setTest();

// draw a chart
echartsStack.setOption(optionStack);

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
period_button2.addEventListener('click', () => {
    const mStart = dayjs(ym_selector2.value);
    const mEnd = dayjs(ym_selector5.value);
    setupchart.arrFilter = _.filter(arrHsh, hsh => {
        return dayjs(hsh['月日']).isBetween(mStart, mEnd, 'month', '[]');
    });

    _.forEach(setupchart.arrLegend, (strLegend) => {
        setupchart.hshStack[strLegend] = _.map(setupchart.arrFilter, hsh => hsh[strLegend]);
    });
    setupchart.arrHshSeries = _.map(setupchart.arrLegend, (strLegend) => {
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