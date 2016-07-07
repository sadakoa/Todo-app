/**
 * リスト要素のドラッグ操作に関係するファイル
 */

import $ from 'jquery'; // jqueryモジュール
require('jquery-ui'); // jquery UIを読み込み
import * as storage from './storage'; // modelを操作する関数


var listAreaId = null; // 要素をドロップする先の変数
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
      const textDataArray = JSON.parse(localStorage.getItem('data')); // 動かした時に配列を取得
      const listItemText = ($.trim($(this).text())); // 先頭と末尾から空白を削除して格納
      console.log(listAreaId);
      for (let i = 0; i < textDataArray.length; i++) {
        if (textDataArray[i].text === listItemText) {
          const iPos = i;
          textDataArray[iPos].category = listAreaId;
          console.log(listAreaId);
          console.log(textDataArray[iPos].category);
          console.log(textDataArray);
          storage.sendStorage(textDataArray);
        }
      }
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
