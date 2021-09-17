'use strict';

import _ from 'lodash';
import dayjs from 'dayjs';
import fs from 'fs';
import isBetween from 'dayjs/plugin/isBetween.js';

dayjs.extend(isBetween);

import {
    arrHsh
} from './rowdata-all.mjs';

const arrStrDateUniq = _.chain(arrHsh).map(hsh => {
    return dayjs(hsh['月日']).format('YYYY-MM');
}).uniq().value();

console.log(arrStrDateUniq);