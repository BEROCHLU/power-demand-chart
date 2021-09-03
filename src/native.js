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

const arrLegendColor = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'];
const arrLegendColorAll = ['#800080', ...arrLegendColor, '#008000'];

// create echarts instance
const echartsHeatmap = echarts.init(cn2);
const echartsLine = echarts.init(cn3);
const echartsLineA = echarts.init(cn5);
const echartsStack = echarts.init(cn3a);
const echartsPercent = echarts.init(cn2a);

const optionHeatmap = {
    tooltip: {
        formatter: (p) => {
            return `${p.name} ${p.value[1]}:00 <br> ${p.value[2]} MWh`;
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
        type: 'value',
        axisLabel: {
            formatter: '{value} MWh'
        }
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
    color: arrLegendColorAll,
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
        type: 'value',
        axisLabel: {
            formatter: '{value} MWh'
        }
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
        type: 'value',
        axisLabel: {
            formatter: '{value} MWh'
        }
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
const optionPercent = {
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'line',
            label: {
                backgroundColor: '#6a7985'
            }
        },
        formatter: (arrParam) => {
            let s = `<div style="width: 150px;"><div>${arrParam[0].name}</div>`;
            let sum = 0;
            _.forEach(arrParam, (param) => {
                s += `<div style="overflow: hidden;">${param.marker}${param.seriesName}<span style="float: right;"><b>${param.value}%</b></span></div>`;
                sum += param.value;
            });
            sum = _.min([100, sum]);
            s += `<div style="overflow: hidden;"><div>合計</div><span style="float: right;"><b>${_.round(sum, 1)}%</b></span></div></div>`;
            return s;
        },
        position: 'bottom'
    },
    legend: {
        data: null,
        selector: true,
        selected: {
            '需要': false,
            '揚水': false
        }
    },
    color: arrLegendColor,
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
        type: 'value',
        max: 100,
        axisLabel: {
            formatter: '{value}%'
        }
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

            const arrDom = [ym_selector1, ym_selector2a, ym_selector2b, ym_selector3a, ym_selector3b];
            _.forEach(arrDom, dom => {
                dom.appendChild(elem.cloneNode(true));
            });
        });
    }

    setHshPercent() {
        const arrHshCD = _.cloneDeep(arrHsh); //deep copy
        _.forEach(arrHshCD, hsh => {
            delete hsh["需要"];
            delete hsh["揚水"];
        });

        this.arrHshPercent = _.map(arrHshCD, hsh => {
            let sum = 0;
            _.forEach(hsh, (value, key) => {
                if (key === '月日' || key === '時刻') {
                    sum += 0;
                } else {
                    sum += value;
                }
            });

            return _.mapValues(hsh, (value, key, object) => {
                let result;
                if (key === '月日' || key === '時刻') {
                    result = value;
                } else {
                    result = value / sum * 100;
                    result = _.round(result, 1)
                }
                return result;
            });
        });
    }

    setCrossfilter() {
        const cf2 = crossfilter(arrHsh);
        const myDimension = cf2.dimension(d => {
            return dayjs(d['月日']).format('YYYY-MM-DD');
        });

        const arrKeysOfHsh = _.pull(_.keys(arrHsh[0]), '月日', '時刻');
        const arrMap = _.map(arrKeysOfHsh, strKey => {
            const arrHshDim = myDimension.group().reduceSum(d => d[strKey]).all();

            let arrReturn = _.map(arrHshDim, hshDim => {
                return _.mapKeys(hshDim, (v, k) => {
                    if (k === 'key') {
                        return '月日';
                    } else if (k === 'value') {
                        return strKey;
                    }
                });
            });

            arrReturn = _.map(arrReturn, hsh => {
                return _.mapValues(hsh, (value, key) => {
                    let result;
                    if (key === '月日') {
                        result = value;
                    } else {
                        result = _.round(value, 1);
                    }
                    return result;
                });
            });

            return arrReturn;
        });

        this.arrZip = _.zipWith(...arrMap, (...args) => {
            return _.merge(...args);
        });
    }

    setHshPercentDay() {
        const arrHshCD = _.cloneDeep(this.arrZip); //deep copy
        _.forEach(arrHshCD, hsh => {
            delete hsh["需要"];
            delete hsh["揚水"];
        });

        this.arrHshPercentDay = _.map(arrHshCD, hsh => {
            let sum = 0;
            _.forEach(hsh, (value, key) => {
                if (key === '月日') {
                    sum += 0;
                } else {
                    sum += value;
                }
            });

            return _.mapValues(hsh, (value, key, object) => {
                let result;
                if (key === '月日') {
                    result = value;
                } else {
                    result = value / sum * 100;
                    result = _.round(result, 1)
                }
                return result;
            });
        });
    }

    setarrFilter() {
        const mStart = dayjs(ym_selector1.value);
        this.arrFilter = _.filter(arrHsh, hsh => {
            return dayjs(hsh['月日']).isBetween(mStart, mStart, 'month', '[]');
        });

        this.arrHshFilterPercent = _.filter(this.arrHshPercent, hsh => {
            return dayjs(hsh['月日']).isBetween(mStart, mStart, 'month', '[]');
        });
    }

    setLegend() { // create option innerText & value
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

        const arrKeys2 = _.keys(this.arrHshFilterPercent[0]);
        this.arrLegendPercent = _.pull(arrKeys2, '月日', '時刻', '需要', '揚水');

        this.hshLegendSelect = optionStack.legend.selected //initial selected legends
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
        document.querySelector('#powersum1').innerText = math.unit(n, 'MW').format(3);
    }

    setStack() {
        let hshStack = {}
        this.arrSeriesStack = _.map(this.arrLegend, (strLegend, i) => {
            hshStack[strLegend] = _.map(this.arrFilter, hsh => hsh[strLegend]);

            const elemhead = document.createElement('div');
            elemhead.innerHTML = `<span style="float:left;margin-top:4px;border-radius:10px;width:10px;height:10px;background-color:${arrLegendColorAll[i]};"></span>${strLegend}`;
            elemhead.className = 'series-legend';

            document.querySelector('.total-view-series').appendChild(elemhead);

            const n = _.sum(hshStack[strLegend]);
            const elemNumeric = document.createElement('div');
            elemNumeric.innerText = math.unit(n, 'MW').format(3);
            elemNumeric.className = 'numeric';
            elemNumeric.setAttribute('value', strLegend);

            document.querySelector('.total-view-series').appendChild(elemNumeric);

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

        optionStack.xAxis[0].data = _.map(this.arrFilter, hsh => `${hsh['月日']} ${hsh['時刻']}:00`);
        optionStack.series = this.arrSeriesStack;
        optionStack.legend.data = this.arrLegend;
    }

    setStackPercent() {
        const arrAxisXStack = _.map(this.arrHshFilterPercent, hsh => {
            return `${hsh['月日']} ${hsh['時刻']}:00`;
        });

        let hshStack = {}
        this.arrHshSeriesPercent = _.map(this.arrLegendPercent, strLegend => {
            hshStack[strLegend] = _.map(this.arrHshFilterPercent, hsh => hsh[strLegend]);

            return {
                name: strLegend,
                type: 'line',
                stack: 'stackPercent',
                areaStyle: {},
                symbol: 'none',
                lineStyle: {
                    width: 0.5
                },
                data: hshStack[strLegend]
            }
        });

        optionPercent.xAxis[0].data = arrAxisXStack;
        optionPercent.series = this.arrHshSeriesPercent;
        optionPercent.legend.data = this.arrLegendPercent;
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

        const n = _.sum(hshAxis.arrAxisY);
        document.querySelector('#powersum2').innerText = math.unit(n, 'MW').format(3);
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
        document.querySelector('#powersum1').innerText = math.unit(n, 'MW').format(3);
    }

    reDrawStack(arrAxisXStack) {
        echartsStack.clear();
        optionStack.xAxis[0].data = arrAxisXStack;
        optionStack.series = this.arrSeriesStack;
        optionStack.legend.selected = this.hshLegendSelect;

        echartsStack.setOption(optionStack, true);
    }

    reDrawPercent(arrAxisXStack) {
        echartsPercent.clear();
        optionPercent.xAxis[0].data = arrAxisXStack;
        optionPercent.series = this.arrHshSeriesPercent;

        echartsPercent.setOption(optionPercent, true);
    }

    reDrawLineA(hshAxis) {
        echartsLineA.clear();
        optionLineA.xAxis.data = hshAxis.arrAxisX;
        optionLineA.series[0].data = hshAxis.arrAxisY;

        echartsLineA.setOption(optionLineA, true);
        const n = _.sum(hshAxis.arrAxisY);
        document.querySelector('#powersum2').innerText = math.unit(n, 'MW').format(3);
    }

    changeTick(arrHshFilterDay) {
        let hshAxis = {
            arrAxisX: [],
            arrAxisY: []
        }

        _.forEach(arrHshFilterDay, hsh => {
            const int_yAxis = hsh[data_selector2.value];
            const str_xAxis = hsh['月日'];

            hshAxis.arrAxisX.push(str_xAxis);
            hshAxis.arrAxisY.push(int_yAxis);
        });

        optionLineA.xAxis.data = hshAxis.arrAxisX;
        optionLineA.series[0].data = hshAxis.arrAxisY;

        echartsLineA.setOption(optionLineA, true);

        const n = _.sum(hshAxis.arrAxisY);
        document.querySelector('#powersum2').innerText = math.unit(n, 'MW').format(3);
    }

    changeTickStack(arrHshFilterDay) {
        let hshStack = {}
        let arrHshSeriesDay = _.map(this.arrLegend, (strLegend, i) => {
            hshStack[strLegend] = _.map(arrHshFilterDay, hsh => hsh[strLegend]);

            const n = _.sum(hshStack[strLegend]);
            document.querySelector(`.numeric[value=${strLegend}]`).innerText = math.unit(n, 'MW').format(3);

            return {
                name: strLegend,
                type: 'line',
                stack: (strLegend === '需要') ? 'tickstackB' : 'tickstackA',
                areaStyle: {},
                symbol: 'none',
                lineStyle: {
                    width: 0.5
                },
                data: hshStack[strLegend]
            }
        });

        optionStack.xAxis[0].data = _.map(arrHshFilterDay, hsh => hsh['月日']);
        optionStack.series = arrHshSeriesDay;
        optionStack.legend.data = this.arrLegend;
        optionStack.legend.selected = this.hshLegendSelect;

        echartsStack.setOption(optionStack, true);
    }
}

const setupchart = new SetupChart();
setupchart.setHshPercent();
setupchart.setCrossfilter();
setupchart.setHshPercentDay();
setupchart.setarrFilter();
setupchart.setLegend();
setupchart.setarrPlotHeat();
setupchart.setStack();
setupchart.setStackPercent();
setupchart.setLineA();

// draw a chart
echartsHeatmap.setOption(optionHeatmap);
echartsLine.setOption(optionLine);
echartsLineA.setOption(optionLineA);
echartsPercent.setOption(optionPercent);
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

    if (tick_selector.value === '1h') {
        _.forEach(setupchart.arrFilter, hsh => {
            const int_yAxis = hsh[data_selector2.value];
            const str_xAxis = `${hsh['月日']} ${hsh['時刻']}:00`;

            hshAxis.arrAxisX.push(str_xAxis);
            hshAxis.arrAxisY.push(int_yAxis);
        });
        //re-draw
        setupchart.reDrawLineA(hshAxis);
    } else if (tick_selector.value === '1day') {
        const arrHshFilterDay = _.filter(setupchart.arrZip, hsh => {
            return dayjs(hsh['月日']).isBetween(mStart, mEnd, 'month', '[]');
        });
        //re-draw
        setupchart.changeTick(arrHshFilterDay);
    }
});

// button click
period_button3.addEventListener('click', () => {
    const mStart = dayjs(ym_selector3a.value);
    const mEnd = dayjs(ym_selector3b.value);
    setupchart.arrFilter = _.filter(arrHsh, hsh => {
        return dayjs(hsh['月日']).isBetween(mStart, mEnd, 'month', '[]');
    });

    let arrAxisXStack;
    let hshStack = {}

    if(tick_selector2.value === '1h'){
        arrAxisXStack = _.map(setupchart.arrFilter, hsh => {
            return `${hsh['月日']} ${hsh['時刻']}:00`;
        });
    
        hshStack = {}
        _.forEach(setupchart.arrLegend, strLegend => {
            hshStack[strLegend] = _.map(setupchart.arrFilter, hsh => hsh[strLegend]);
        });
        setupchart.arrSeriesStack = _.map(setupchart.arrLegend, strLegend => {
    
            const n = _.sum(hshStack[strLegend]);
            document.querySelector(`.numeric[value=${strLegend}]`).innerText = math.unit(n, 'MW').format(3);
    
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
    
        const arrHshDataPercent = _.filter(setupchart.arrHshPercent, hsh => {
            return dayjs(hsh['月日']).isBetween(mStart, mEnd, 'month', '[]');
        });
    
        hshStack = {}
        setupchart.arrHshSeriesPercent = _.map(setupchart.arrLegendPercent, strLegend => {
            hshStack[strLegend] = _.map(arrHshDataPercent, hsh => hsh[strLegend]);
    
            return {
                name: strLegend,
                type: 'line',
                stack: 'stackPercent',
                areaStyle: {},
                symbol: 'none',
                lineStyle: {
                    width: 0.5
                },
                data: hshStack[strLegend]
            }
        });

        setupchart.reDrawStack(arrAxisXStack);

    } else if(tick_selector2.value === '1day') {
        const arrHshFilterDay = _.filter(setupchart.arrZip, hsh => {
            return dayjs(hsh['月日']).isBetween(mStart, mEnd, 'month', '[]');
        });

        arrAxisXStack = _.map(arrHshFilterDay, hsh => hsh['月日']);
    
        hshStack = {}
        setupchart.changeTickStack(arrHshFilterDay);
    }

    //re-draw
    setupchart.reDrawPercent(arrAxisXStack);
});