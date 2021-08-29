'use strict';

import {
    arrHsh
} from './rowdata-all.mjs';

import _ from 'lodash';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween.js';
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
    const arrHshDim = myDimension.group().reduceSum(d => d[strKey]).all();

    let arr = _.map(arrHshDim, hshDim => {
        let hsh = _.mapKeys(hshDim, (v, k) => {
            if (k === 'key') {
                return '月日';
            } else if (k === 'value') {
                return strKey;
            }
        });
        
        return hsh;
    });

    //console.log(arr);
    return arr;
});

let arrZip = _.zipWith(...arrMap, (...args) => {
    let m = _.merge(...args);
    //console.log(m);
    return m;
});

console.log(arrZip);
/*
_.forEach(arrKeysOfHsh, strKey => {
    const dim = myDimension.group().reduceSum(d => d[strKey]);
    const arrHshDim = dim.all();
    _.merge(hshMerge, arrHshDim);

});*/

/*
const arrHshDay = _.map(arrStrUniqDay, strUniqDay => {
    let hshDay = {}

    _.forEach(arrKeysOfHsh, strKey => {
        if(strKey === '月日') {
            hshDay["月日"] = strUniqDay;
            return;
        }
        
        let sum = cf2.groupAll().reduceSum(d => d[strKey]).value();
        hshDay[strKey] = _.round(sum, 1);
    });

    return hshDay;
});*/