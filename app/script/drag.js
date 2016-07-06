/**
 * リスト要素のドラッグ操作に関係するファイル
 */

import $ from 'jquery'; // jqueryモジュール
require('jquery-ui'); // jquery UIを読み込み

var listAreaID = null;

// リスト要素にドラッグイベントを設定する関数
export function dragEvent() {
  const textDataArray = JSON.parse(localStorage.getItem('data')); // ストレージのデータ
  $('.c-sticky').draggable({
    // ドラッグ操作を終了した時に呼び出される----------------
    stop: function(evt, ui) {
      const listItemText = ($(this).text());
      console.log(listItemText);
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
    },
    // -----------------------------------------------
  });
}

// 要素をドロップした後に呼ばれる関数
$('.c-card').droppable({
  accept: '.c-sticky', // 受け入れる要素
  drop: function(evt, ui) {
    listAreaID = $(this).find('ul').attr('id'); //受け入れ先のIDを取得
  }
});
