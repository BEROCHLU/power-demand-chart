'use strict';

//nodelistオブジェクトを配列に変換
const lists = Array.from(document.querySelectorAll("li"));
const arrElem = document.querySelectorAll('li');
//要素liの全てについてクリックイベントを追加する
for (const elem of arrElem) {
    elem.addEventListener('click', (event) => {
        //console.log(event);
        const arrElemli = document.querySelectorAll('li');
        const arrElemdiv = document.querySelectorAll('#panel_group>div');
        //アクティブなクラスは全て削除
        for (const elem of arrElemli) {
            elem.classList.remove('active-tab');
        }
        for (const elem of arrElemdiv) {
            elem.classList.remove('active-panel');
        }

        const index = lists.findIndex((list) => {
            //一致した要素があればインデックスを返す
            return list === event.target;
        });

        //クリックした要素liに.active-tabを追加
        event.target.classList.add('active-tab');
        //クリックした要素liに対応したパネルに.active-panelを追加
        document.querySelector(`#panel_group>div:nth-of-type(${index+1})`).classList.add('active-panel');
    });
}