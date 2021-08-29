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
const echartsPercent = echarts.init(cn2);

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
    color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
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
    toolbox: { //'#800080', '#ffff00', '#a0522d', '#0000ff', '#ff4500', '#90ee90', '#87cefa', '#C0C0C0', '#ffa500', '#E6D2C9', '#008000'
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
        const arrStrUniqMonth = _.chain(arrHsh).map(hsh => {
            return dayjs(hsh['月日']).format('YYYY-MM');
        }).uniq().value();

        _.forEach(arrStrUniqMonth, (strOption) => { // create option innerText & value
            const elem = document.createElement('option');
            elem.innerText = strOption;
            elem.value = strOption;

            const arrDom = [ym_selector1, ym_selector2];
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
            let m = _.merge(...args);
            //console.log(m);
            return m;
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

    setarrLegend() { // create option innerText & value
        const arrKeys = _.keys(this.arrFilter[0]);
        const arrOption = _.pull(arrKeys, "月日", "時刻");
        this.arrLegend = _.cloneDeep(arrOption); //deep copy

        const arrKeys2 = _.keys(this.arrHshFilterPercent[0]);
        this.arrLegend2 = _.pull(arrKeys2, '月日', '時刻', '需要', '揚水');
    }

    setStack() {
        this.hshLegendSelect = optionStack.legend.selected //selected legends

        const arrAxisXStack = _.map(this.arrFilter, hsh => {
            return `${hsh['月日']} ${hsh['時刻']}:00`;
        });

        let hshStack = {}
        this.arrHshSeries = _.map(this.arrLegend, (strLegend) => {
            hshStack[strLegend] = _.map(this.arrFilter, hsh => hsh[strLegend]);
            const hshSeries = {
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
            return hshSeries;
        });

        optionStack.xAxis[0].data = arrAxisXStack;
        optionStack.series = this.arrHshSeries;
        optionStack.legend.data = this.arrLegend;
    }

    setStackPercent() {
        const arrAxisXStack = _.map(this.arrHshFilterPercent, hsh => {
            return `${hsh['月日']} ${hsh['時刻']}:00`;
        });

        let hshStack = {}
        this.arrHshSeries2 = _.map(this.arrLegend2, strLegend => {
            hshStack[strLegend] = _.map(this.arrHshFilterPercent, hsh => hsh[strLegend]);
            const hshSeries = {
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
            return hshSeries;
        });

        optionPercent.xAxis[0].data = arrAxisXStack;
        optionPercent.series = this.arrHshSeries2;
        optionPercent.legend.data = this.arrLegend2;
    }

    reDrawStack(arrAxisXStack) {
        echartsStack.clear();
        optionStack.xAxis[0].data = arrAxisXStack;
        optionStack.series = this.arrHshSeries;
        optionStack.legend.selected = this.hshLegendSelect;

        echartsStack.setOption(optionStack, true);
    }

    reDrawPercent(arrAxisXStack) {
        echartsPercent.clear();
        optionPercent.xAxis[0].data = arrAxisXStack;
        optionPercent.series = this.arrHshSeries2;

        echartsPercent.setOption(optionPercent, true);
    }

    changeTick(arrHshFilterDay) {
        this.hshLegendSelect = optionStack.legend.selected //selected legends

        let hshStack = {}
        this.arrHshSeries = _.map(this.arrLegend, strLegend => {
            hshStack[strLegend] = _.map(arrHshFilterDay, hsh => hsh[strLegend]);

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

        optionStack.xAxis[0].data = _.map(arrHshFilterDay, hsh => hsh['月日']);
        optionStack.series = this.arrHshSeries;
        optionStack.legend.data = this.arrLegend;
        optionStack.legend.selected = this.hshLegendSelect;

        echartsStack.setOption(optionStack, true);
    }
}

const setupchart = new SetupChart();
setupchart.setHshPercent();
setupchart.setCrossfilter();
setupchart.setarrFilter();
setupchart.setarrLegend();
setupchart.setStack();
setupchart.setStackPercent();
setupchart.setHshPercentDay();

// draw a chart
echartsStack.setOption(optionStack);
echartsPercent.setOption(optionPercent);

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
    const mEnd = dayjs(ym_selector2.value);
    setupchart.arrFilter = _.filter(arrHsh, hsh => {
        return dayjs(hsh['月日']).isBetween(mStart, mEnd, 'month', '[]');
    });

    let hshStack = {}
    _.forEach(setupchart.arrLegend, (strLegend) => {
        hshStack[strLegend] = _.map(setupchart.arrFilter, hsh => hsh[strLegend]);
    });
    setupchart.arrHshSeries = _.map(setupchart.arrLegend, (strLegend) => {
        hshStack[strLegend] = _.map(setupchart.arrFilter, hsh => hsh[strLegend]);

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

    const arrHshDataPercent = _.filter(setupchart.arrHshPercent, hsh => {
        return dayjs(hsh['月日']).isBetween(mStart, mEnd, 'month', '[]');
    });

    hshStack = {}
    setupchart.arrHshSeries2 = _.map(setupchart.arrLegend2, strLegend => {
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

    if (tick_selector.value === '1h') {
        //re-draw
        setupchart.reDrawStack(arrAxisXStack);
        setupchart.reDrawPercent(arrAxisXStack);
    } else if (tick_selector.value === '1day') {
        const arrHshFilterDay = _.filter(setupchart.arrZip, hsh => {
            return dayjs(hsh['月日']).isBetween(mStart, mEnd, 'month', '[]');
        });

        const arrHshDataPercent = _.filter(setupchart.arrHshPercentDay, hsh => {
            return dayjs(hsh['月日']).isBetween(mStart, mEnd, 'month', '[]');
        });

        const arrAxisXStack = _.map(arrHshDataPercent, hsh => hsh['月日']);
    
        hshStack = {}
        setupchart.arrHshSeries2 = _.map(setupchart.arrLegend2, strLegend => {
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

        setupchart.changeTick(arrHshFilterDay);
        setupchart.reDrawPercent(arrAxisXStack);
    }
});