'use strict';

import {
    arrHsh
} from './rowdata.mjs';

import _ from 'lodash';

let arrKeys = _.keys(arrHsh[0]);
let arrLegend = _.pull(arrKeys, "月日", "時刻", "需要");

let hshPlot = {}

const arrAxisX = _.map(arrHsh, (hsh) => {
    const str_day = hsh['月日'];
    const str_h = hsh['時刻'];
    return `${str_day} ${str_h}:00`;
});

// create plot data
_.forEach(arrLegend, (legend) => {
    hshPlot[legend] = _.map(arrHsh, hsh => parseInt(hsh[legend]));
});

