'use strict';

const myChart = echarts.init(cn1);

let arrData = [
    [120, 132, 101, 134, 90, 230, 210],
    [220, 182, 191, 234, 290, 330, 310],
    [150, 232, 201, 154, 190, 330, 410],
    [320, 332, 301, 334, 390, 330, 320]
];

const arraysSum = (arr1, arr2) => {
    return _.map(arr1, (data, i) => {
        return data + arr2[i];
    });
}

const arraysNom = (arr1, arr2) => {
    return _.map(arr1, (data, i) => {
        let f100 = (data / arr2[i]) * 100;
        let f = _.round(f100, 1);
        return f;
    });
}

let arrSum = _.fill(Array(arrData[0].length), 0);

_.forEach(arrData, arr => {
    arrSum = arraysSum(arrSum, arr);
});

//let arrNom = [];

let arrNom = _.map(arrData, arr => {
    return  arraysNom(arr, arrSum);
});


//let a = arraysSum(arrData[0], []);
console.log(arrNom);

const option = {
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
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
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
            data: arrNom[0]
        },
        {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},

            data: arrNom[1]
        },
        {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},

            data: arrNom[2]
        },
        {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            areaStyle: {},

            data: arrNom[3]
        }
    ]
};

myChart.setOption(option);

myChart.on('legendselectchanged', params => {
    console.log(params.selected);
});