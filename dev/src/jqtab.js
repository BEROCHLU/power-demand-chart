'use strict';

$('li:nth-of-type(1),li:nth-of-type(3)').on('click', function () {
    const INDEX = $(this).index();
    //アクティブなクラスは全て削除
    $('li').removeClass('active-tab');
    $('#panel_group>div').removeClass('active-panel');
    //クリックした要素liにアクティブを追加
    //$(this).addClass('active-tab');
    $('li').eq(INDEX).addClass('active-tab');
    $('li').eq(INDEX+3).addClass('active-tab');
    $('#panel_group>div').eq(INDEX).addClass('active-panel');
    //$(`#panel_group>div:nth-of-type(${INDEX+1})`).addClass('active-panel');
    //console.log(INDEX);
    const n = Math.min(2, INDEX+1);
    $('li:nth-of-type(2)').text(`${n}/2`);
});