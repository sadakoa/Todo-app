/**
 * リスト要素のドラッグ操作に関係するファイル
 */

import $ from 'jquery'; // jqueryモジュール
require('jquery-ui'); // jquery UIを読み込み

var listAreaId = null; // 要素をドロップする先の変数
const textDataArray = JSON.parse(localStorage.getItem('data')); // ストレージのデータ
const moveDecision = true; // 動かす判定

// リスト要素にドラッグイベントを設定する関数
export function dragEvent() {
  $('.c-sticky').draggable({
    snap: '.p-task-listArea', // スナップさせる領域
    snapMode: 'inner', // スナップ適応
    opacity: 0.4, // ドラッグ時の透明度
    revert: 'invalid', // 指定領域以外はスナップできない
    // ドラッグ操作を終了した時に呼び出される----------------
    stop: function(evt, ui) {
      const listItemText = ($(this).text());
      console.log(listItemText);
      console.log(listAreaId);
      console.log(textDataArray);

    },
    // -----------------------------------------------
  });
}

// 要素をドロップした後に呼ばれる関数
$('.p-task-listArea').droppable({
  accept: '.c-sticky', // 受け入れる要素
  drop: function(evt, ui) {
    listAreaId = $(this).attr('id'); //受け入れ先のIDを取得
  }
});

//   for(let i = 0; i < textDataArray.length; i++) {
//     if(textDataArray[i].text === $.trim(listItemText)) {
//     let iPos = i;
//     // console.log(iPos);
//     // console.log(textDataArray[iPos]);
//     console.log(textDataArray);
//     textDataArray.splice(iPos, 1);
//     console.log(textDataArray);
//   }
// }
