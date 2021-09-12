'use strict';

import $ from 'jquery';

$('li[name="arrow"]').on('click', function () {
    const INDEX = $(this).index();
    const LEN = $('li').length;
    //アクティブなクラスは全て削除
    $('li').removeClass('active-tab');
    $('#panel_group>div').removeClass('active-panel');
    //クリックした要素liにアクティブを追加
    //$(this).addClass('active-tab');
    $('li').eq(INDEX).addClass('active-tab');
    $('li').eq(INDEX + LEN / 2).addClass('active-tab');
    $('#panel_group>div').eq(INDEX - 1).addClass('active-panel');
    //$(`#panel_group>div:nth-of-type(${INDEX+1})`).addClass('active-panel');
    //console.log(INDEX);
    const n = Math.min(2, INDEX);
    $('li.axis-tab').text(`${n}/2`);
});