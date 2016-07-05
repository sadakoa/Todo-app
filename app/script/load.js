/**
 * HTML読み込み時に実行される処理をまとめたファイル
 */

import $ from 'jquery';

// ========================================================================

/**
 * initialize - もしローカルストレージにデータがある場合、指定領域にリスト要素を生成する関数
 */
export function initialize() {
  // 配列にあるデータの取得 & 文字列からオブジェクトにパース
  let storageData = JSON.parse(localStorage.getItem('data'));

  // リストを追加する場所
  let cardArea = $('.p-backlog-card .p-task-listArea');

  if (storageData !== null) {
    for(let i=0; i < storageData.length; i++) {
      // リスト要素の生成
      let listItem = $(`
        <li class="c-sticky p-task-listarea__item">${storageData[i].text}<a class="p-task-edit">
        <img src="images/edit.png" width="20" class="p-task-edit__img"></a></li>
      `);
      // 追加
      cardArea.append(listItem);
    }
  }
}

// ========================================================================

/**
 * setEvent - イベントリスナーの初期化をまとめた関数
 */
export function setEvent() {
  console.log('Hello SQUIRREL');
}
