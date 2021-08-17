'use strict';

import _ from 'lodash';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween.js';

dayjs.extend(isBetween);

import {
    arrHsh
} from './rowdata-all.mjs';

const mStart = dayjs('2020-01');
let arrFilter = _.filter(arrHsh, hsh => {
    const strDate = hsh['月日'];
    const mTarget = dayjs(strDate);
    return mTarget.isBetween(mStart, mStart, 'month', '[]');
});

let arrStrDate = _.chain(arrHsh).map(hsh => hsh['月日']).uniq().value();
let arrOptionYear = [];
let arrOptionMonth = [];

let arrStrYM = _.chain(arrStrDate).map(strDate => {
    let y = dayjs(strDate).year();
    let m = dayjs(strDate).month() + 1;
    m = _.padStart(m, 2, '0');

    arrOptionYear.push(y);
    arrOptionMonth.push(m);

    return `${y}-${m}`;
}).uniq().value();

arrOptionYear = _.uniq(arrOptionYear);
arrOptionMonth = _.uniq(arrOptionMonth);

const mYear = dayjs('2021');

let arrYear = _.filter(arrStrYM, strMonth => {
    return dayjs(strMonth).isBetween(mYear, mYear, 'year', '[]');
});

console.log(arrYear);

_.forEach(arrYear, strYear => {
    console.log(strYear.slice(-2));
});

//fs.writeFileSync('./checkdata.json', JSON.stringify(arrFilter, null, '\t'));