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

const arrHshFilterCD = _.cloneDeep(arrFilter); //deep copy

_.forEach(arrHshFilterCD, hsh => {
    delete hsh["需要"];
    delete hsh["揚水"];
});

const arrHshPercent = _.map(arrHshFilterCD, hsh => {
    let sum = 0;
    _.forEach(hsh, (value, key) => {
        if (key === '月日' || key === '時刻') {
            sum += 0;
        } else {
            sum += value;
        }
        //console.log(sum);
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

const arrKeys = _.keys(arrHshFilterCD[0]);
const arrOption = _.pull(arrKeys, '月日', '時刻');
console.log(arrOption);