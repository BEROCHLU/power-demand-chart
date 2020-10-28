'use strict';

var arrX = _.chain(arrHsh).map(function (hsh) {
  return hsh['月日'];
}).uniq().value();

var arrY = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
var arrMaxin = [];
var arrAxisX = []; // [x, y, z]
// [0-23, 0-30, value]

var arrPlot = _.map(arrHsh, function (hsh, i) {
  var int_day = parseInt(i / 24);
  var int_hour = parseInt(hsh['時刻']);
  var int_value = parseInt(hsh['太陽光実績']);
  var str_day = hsh['月日'];
  var str_h = hsh['時刻'];
  var str_xAxis = "".concat(str_day, " ").concat(str_h, ":00");
  arrAxisX.push(str_xAxis);
  arrMaxin.push(int_value);
  return [int_day, int_hour, int_value || '-'];
});

var myChart1 = echarts.init(document.getElementById('cn1'));
var myChart2 = echarts.init(document.getElementById('cn2'));
var option1 = {
  tooltip: {
    formatter: function formatter(p) {
      return "".concat(p.name, " ").concat(p.value[1], ":00 <br> ").concat(p.value[2]);
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
    min: _.min(arrMaxin),
    max: _.max(arrMaxin),
    calculable: true,
    orient: 'vertical',
    //horizontal | vertical
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
};
var option2 = {
  tooltip: {
    trigger: 'axis',
    // item | axis
    position: 'top'
  },
  toolbox: {
    show: true,
    feature: {
      dataView: {
        readOnly: false
      },
      magicType: {
        type: ["line", "bar"]
      },
      restore: {},
      saveAsImage: {}
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
  }, {
    show: true,
    type: 'slider',
    bottom: '1%',
    throttle: 128,
    start: 0,
    end: 100
  }],
  series: [{
    data: arrMaxin,
    symbol: 'circle',
    symbolSize: 4,
    type: 'line' //line | bar

  }]
};
myChart1.setOption(option1);
myChart2.setOption(option2);
