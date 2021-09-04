'use strict';

import {
    arrHsh
} from './rowdata.mjs';

import _ from 'lodash';

let arrKeys = _.keys(arrHsh[0]);
let arrLegend = _.pull(arrKeys, "月日", "時刻", "需要");

let hshPlot = {}
let DATA_LEN;
// create plot data
_.forEach(arrLegend, (strLegend) => {
    hshPlot[strLegend] = _.map(arrHsh, hsh => parseInt(hsh[strLegend]));
    DATA_LEN = hshPlot[strLegend].length;
    //console.log(DATA_LEN);
});

//console.log(hshPlot);
let arrSum = [];
for (let i = 0; i < DATA_LEN; i++) {
    let sum = 0;
    _.forEach(arrLegend, (strLegend) => {
        sum += hshPlot[strLegend][i];
    });
    arrSum.push(sum);
}

hshPlot["合計"] = arrSum;
console.log(hshPlot);