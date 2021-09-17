export {};

const XLSX = require('xlsx');
const _ = require('lodash');
const dayjs = require('dayjs');
const fs = require('fs');
const path = require('path');

const DIR_PATH: string = path.join(__dirname, './data');
const arrStrFile: string[] = fs.readdirSync(DIR_PATH);

interface Hsh {
    '月日': number;
    '時刻': any;
    '需要': number;
    '原子力': number;
    '地熱': number;
    '水力': number;
    '火力': number;
    'バイオマス': number;
    '風力実績': number;
    '風力抑制量': number;
    '太陽光実績': number;
    '太陽光抑制量': number;
    '揚水': number;
}

interface Power {
    '月日': string;
    '時刻': number;
    '電力需要': number;
    '原子力': number;
    '地熱': number;
    '水力': number;
    '火力': number;
    'バイオマス': number;
    '風力実績': number;
    '風力抑制量': number;
    '太陽光実績': number;
    '太陽光抑制量': number;
    '揚水': number;
}

let arrConcat: Power[] = [];

_.forEach(arrStrFile, (strFile: string) => {
    const FILE_PATH = path.join(DIR_PATH, strFile);
    const workbook = XLSX.readFile(FILE_PATH, {
        codepage: 932 //shift-jis
    });

    const worksheet = workbook.Sheets['Sheet1'];

    let arrHsh = XLSX.utils.sheet_to_json(worksheet, {
        range: 3 //skip 3 rows
    });

    let arrTemplate: Power[] = _.map(arrHsh, (hsh: Hsh) => {
        const strHour = hsh['時刻'].replace('時', '');
        hsh['時刻'] = parseInt(strHour);

        const nExcelSerial = hsh['月日'] - 2; //Excelでは1900年が閏年判定され2月29日まであるため-2する
        const strDate = dayjs('1900-01-01').add(nExcelSerial, 'days').format('YYYY-MM-DD');
        hsh['月日'] = strDate;

        return _.mapKeys(hsh, (value: number, key: string) => {
            return (key === '需要') ? '電力需要' : key;
        });
    });

    arrConcat = _.concat(arrConcat, arrTemplate);
});

const strExport: string = 'module.exports = ' + JSON.stringify(arrConcat, null, '\t') + ';';
fs.writeFileSync('../dev/src/rowdata-all.js', strExport);