'use strict';

import fs from 'fs';
import _ from 'lodash';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween.js';

dayjs.extend(isBetween);

import {
    arrHsh
} from './rowdata-all.mjs';

const mStart = dayjs('2020-12');
const mEnd = dayjs('2020-12');

let arrFilter = _.filter(arrHsh, hsh => {
    const strDate = hsh['月日'];
    const mTarget = dayjs(strDate);
    return mTarget.isBetween(mStart, mEnd, 'month', '[]');
});

//console.log(arrFilter);
fs.writeFileSync('./checkdata.json', JSON.stringify(arrFilter, null, '\t'));