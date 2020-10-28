'use strict'; //株数計算

$('.text-group tr:nth-of-type(2) td:not(:nth-of-type(2)) > input').change(function () {
  var strPower = ''; //replaceを使うため明示的にstring宣言

  var dShares, dPrice;
  var strTextarea;
  var FEE = 23.09; //売却手数料を適用

  if ('number' === $(this)[0].type) {
    strPower = $('.text-group tr:nth-of-type(2) td:first-of-type > input').val();
    dPrice = $(this).val();
  } else {
    strPower = $(this).val();
    dPrice = $('.text-group tr:nth-of-type(2) td:last-of-type > input').val();
  }

  strPower = strPower.replace(/,/g, '').trim(); //空白コンマ除去;

  var dPower = parseFloat(strPower); //文字列float変換

  if ($.isNumeric(dPower) == false || $.isNumeric(dPrice) == false) {
    return false; //両方入力されてなければ処理中断
  }

  dShares = Math.floor((dPower - FEE) / dPrice); //小数点以下を切り捨て

  $('.text-group tr:nth-of-type(2) td:nth-of-type(2) > input').val(dShares);
  strTextarea = "".concat(dPower, ":").concat(dShares, ":").concat(dPrice, "\n").concat($('textarea').val()); //履歴結合

  $('textarea').val(strTextarea);
}); //クリップボードにコピー

$('.text-group tr:nth-of-type(2) td:nth-of-type(2) > input').click(function () {
  $(this).select();
  document.execCommand('copy');
}); //テキストクリア

$('.clear-button').click(function () {
  $('.text-group input').each(function () {
    $(this).val(''); //class下の全inputのvalueをクリア
  });
  $('textarea').val('');
});