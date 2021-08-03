'use strict';

import {
    arrHsh
} from './rowdata.mjs';

import _ from 'lodash';

let arrKeys = _.keys(arrHsh[0]);
let arrLegend = _.pull(arrKeys, "月日", "時刻", "需要");

let hshPlot = {}
//let arrLegend = ['太陽光実績', '地熱', '水力', '風力実績', '原子力', '火力', 'バイオマス', '風力抑制量', '太陽光抑制量', '揚水'];

const arrAxisX = _.map(arrHsh, (hsh) => {
    const str_day = hsh['月日'];
    const str_h = hsh['時刻'];
    return `${str_day} ${str_h}:00`;
});

// create plot data
_.forEach(arrLegend, (legend) => {
    hshPlot[legend] = _.map(arrHsh, hsh => parseInt(hsh[legend]));
});

//console.log(hshPlot[arrLegend[0]]);

const option = {
    title: {
        text: '堆叠区域图'
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
            saveAsImage: {}
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
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }],
    yAxis: [{
        type: 'value'
    }],
    series: [{
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
}
