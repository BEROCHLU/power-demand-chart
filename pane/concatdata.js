'use strict';

const XLSX = require('xlsx');
const _ = require('lodash');
const dayjs = require('dayjs');
const fs = require('fs');
const path = require('path');

const DIR_PATH = path.join(__dirname, '../data');
const arrStrFile = fs.readdirSync(DIR_PATH);

let arrConcat = [];

_.forEach(arrStrFile, strFile => {
    const FILE_PATH = path.join(DIR_PATH, strFile);
    const workbook = XLSX.readFile(FILE_PATH, {
        codepage: 932 //shift-jis
    });

    const worksheet = workbook.Sheets['Sheet1'];

    let arrHsh = XLSX.utils.sheet_to_json(worksheet, {
        range: 3 //skip 3 rows
    });

    _.forEach(arrHsh, hsh => {
        const strHour = hsh['時刻'].replace('時', '');
        hsh['時刻'] = parseInt(strHour);

        const nExcelSerial = hsh['月日'] - 2; //Excelでは1900年が閏年判定され2月29日まであるため-2する
        const strDate = dayjs('1900-01-01').add(nExcelSerial, 'days').format('YYYY/M/D');
        hsh['月日'] = strDate;
    });

    arrConcat = _.concat(arrConcat, arrHsh);
});

const strExport = 'export const arrHsh = ' + JSON.stringify(arrConcat, null, '\t') + ';';
fs.writeFileSync('./rowdata-all.mjs', strExport);