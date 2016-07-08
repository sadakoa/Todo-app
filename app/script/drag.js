 // =============================================================
 // drag.js - リスト要素のドラッグ&ドロップに関係する処理を行う
 // =============================================================

// 利用モジュール ================================================
import $ from 'jquery';               // jqueryをインポート
require('jquery-ui');                 // jquery UIを読み込み
import * as storage from './storage'; // ローカルストレージを操作する関数
// ============================================================

// グローバル変数 =================================================
let listAreaId = null; // li要素をドロップする要素
// ============================================================

/**
 * dragEvent - li要素にドラッグイベントを設定する関数
 */
export const dragEvent = () => {
  // console.log(listAreaId);
  $('.c-sticky').draggable({
    snap: '.p-task-listArea', // スナップさせる領域
    snapMode: 'inner',        // スナップの判定
    opacity: 0.4,             // ドラッグ時の透明度
    revert: 'invalid',        // 指定領域以外はスナップできないに

    // ドラッグ操作を終了時に呼び出される関数
    stop: function(evt, ui) {
      const textDataArray = JSON.parse(localStorage.getItem('data'));
      // 先頭と末尾から空白を削除して格納
      const listItemText = ($.trim($(this).text()));
      // li要素のテキストが配列内の要素にマッチするまで繰り返し
      for (let i = 0; i < textDataArray.length; i++) {
        // もしマッチしたら処理を行う
        if (textDataArray[i].text === listItemText) {
          // マッチした要素の配列位置
          let iPos = i;
          // もし指定領域にスナップされたらlistAreaIdを上書きする
          if (listAreaId !== null) {
            textDataArray[iPos].category = listAreaId;
          }
          // ストレージを更新
          storage.sendStorage(textDataArray);
        }
      }
    },
  });
};

// ============================================================

// 要素をドロップした後に呼ばれる関数
$('.p-task-listArea').droppable({
  // 受け入れる要素
  accept: '.c-sticky',
  drop: function(evt, ui) {
   // スナップさせる領域のid名を取得
    listAreaId = $(this).attr('id');
  },
});
