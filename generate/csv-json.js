'use strict';

const XLSX = require('xlsx');
const _ = require('lodash');
const dayjs = require('dayjs');
const fs = require("fs");

const workbook = XLSX.readFile('../data/csv/202106_10エリア計.csv', {
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

const strExport = 'export const arrHsh = ' + JSON.stringify(arrHsh, null, '\t') + ';';
fs.writeFileSync('../src/rowdata.js', strExport);
//fs.writeFileSync('./data.json', JSON.stringify(arrHsh, null, '\t'));