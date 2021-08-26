'use strict';

import {
    arrHsh
} from './rowdata-all.mjs';

import _ from 'lodash';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween.js';

dayjs.extend(isBetween);

const mStart = dayjs('2020-01');
const arrFilter = _.filter(arrHsh, hsh => {
    return dayjs(hsh['月日']).isBetween(mStart, mStart, 'month', '[]');
});

const arrHshPercent = _.cloneDeep(arrFilter); //deep copy

_.forEach(arrHshPercent, hsh => {
    delete hsh["需要"];
    delete hsh["揚水"];
});

const arrMap = _.map(arrHshPercent, hsh => {
    let sum = 0;
    _.forEach(hsh, (value, key) => {
        if (key === '月日' || key === '時刻') {
            sum += 0;
        } else {
            sum += value;
        }
        //console.log(sum);
    });

    let hsh2 = _.mapValues(hsh, (value, key, object) => {
        let result;
        if (key === '月日' || key === '時刻') {
            result = value;
        } else {
            result = value / sum * 100;
            result = _.round(result, 1)
        }
        return result;
    });
    //console.log(hsh2);
    //hsh["小計"] = sum;
    return hsh2;
});

console.log(arrMap);