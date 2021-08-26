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

const arrHshFilter = _.cloneDeep(arrFilter); //deep copy

_.forEach(arrHshFilter, hsh => {
    delete hsh["需要"];
    delete hsh["月日"];
    delete hsh["時刻"];
    delete hsh["揚水"];

    return hsh;
});

_.forEach(arrHshFilter, hsh => {
    const sum = _.reduce(hsh, (presum, current) => {
        //console.log(presum, current);
        return presum + current;
    });
    //console.log(sum);

    hsh["小計"] = sum;
});

console.log(arrHshFilter);