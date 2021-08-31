'use strict';

import {
    arrHsh
} from './rowdata-all.mjs';

import _ from 'lodash';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween.js';
import {
    unit
} from 'mathjs';
import crossfilter from 'crossfilter2';

dayjs.extend(isBetween);

const arrKeysOfHsh = _.pull(_.keys(arrHsh[0]), '月日', '時刻');
//const arrStrUniqDay = _.chain(arrHsh).map(hsh => hsh['月日']).uniq().value();

const cf2 = crossfilter(arrHsh);
const myDimension = cf2.dimension(d => {
    return dayjs(d['月日']).format('YYYY-MM-DD');
    //return d['月日'];
});

const arrMap = _.map(arrKeysOfHsh, strKey => {
    const arrHshDim = myDimension.group().reduceSum(d => {
        return d[strKey];
    }).all();

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

let arrZip = _.zipWith(...arrMap, (...args) => {
    let m = _.merge(...args);
    //console.log(m);
    return m;
});

//console.log(arrZip);

_.forEach(arrKeysOfHsh, strKey => {
    let n = myDimension.groupAll().reduceSum(d => d[strKey]).value();
    n = unit(n, 'MW').format(3);
    console.log(strKey, n);
});