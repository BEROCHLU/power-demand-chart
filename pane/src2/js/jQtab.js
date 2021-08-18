'use strict';

$('li:first-of-type,li:last-of-type').click(function () {
    const INDEX = $(this).index();
    //アクティブなクラスは全て削除
    $('li').removeClass('active-tab');
    $('#panel_group>div').removeClass('active-panel');
    //クリックした要素liにアクティブを追加
    $(this).addClass('active-tab');
    $('#panel_group>div').eq(INDEX).addClass('active-panel');
    //$(`#panel_group>div:nth-of-type(${INDEX+1})`).addClass('active-panel');
});