'use strict';

import {
    arrHsh
} from './rowdata-all.mjs';

import _ from 'lodash';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween.js';
import crossfilter from 'crossfilter2';

dayjs.extend(isBetween);

const arrKeysOfHsh = _.pull(_.keys(arrHsh[0]), "時刻");
const arrStrUniqDay = _.chain(arrHsh).map(hsh => hsh['月日']).uniq().value();

const cf2 = crossfilter(arrHsh);
const myDimension = cf2.dimension(d => {
    return dayjs(d['月日']).format('YYYY-MM-DD');
});
const j = myDimension.group().reduceSum(d => d["需要"]);
const g = myDimension.group().reduceSum(d => d["原子力"]);

console.log(j.all());
console.log(g.all());

/*
_.forEach(arrStrUniqDay, strUniqDay => {
    myDimension.filter(strUniqDay);
    let n = cf2.groupAll().reduceSum(d => d["需要"]).value();
    console.log(strUniqDay, n);
});*/

/*
const arrHshDay = _.map(arrStrUniqDay, strUniqDay => {
    let hshDay = {}

    _.forEach(arrKeysOfHsh, strKey => {
        if(strKey === '月日') {
            hshDay["月日"] = strUniqDay;
            return;
        }

        myDimension.filter(strUniqDay);
        let sum = cf2.groupAll().reduceSum(d => d[strKey]).value();
        hshDay[strKey] = _.round(sum, 1);
    });

    return hshDay;
});

console.log(arrHshDay);*/