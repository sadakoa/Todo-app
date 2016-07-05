/**
 * HTML読み込み時に実行される処理をまとめたファイル
 */

import $ from 'jquery';

// ========================================================================

/**
 * initialize - もしローカルストレージにデータがある場合、指定領域にリスト要素を生成する関数
 */
export function initialize() {
  let storageData = localStorage.getItem('data');
  let parseData = JSON.parse(storageData);
  if (parseData !== null) {
    let cardArea = $('.p-task-listArea');
    let listItem = $(`
      <li class="c-sticky p-task-listarea__item">${parseData}<a class="p-task-edit">
      <img src="images/edit.png" width="20" class="p-task-edit__img"></a></li>
    `);
    cardArea.append(listItem);
  }
  console.info(storageData, parseData);
}


/**
 * setEvent - イベントリスナーの初期化をまとめた関数
 */
export function setEvent() {
  console.log('Hello SQUIRREL');
}
