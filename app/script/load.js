/**
 * HTML読み込み時に実行される処理をまとめたファイルです
 */

import $ from 'jquery';

// ========================================================================

/**
 * initialize - もしローカルストレージにデータがある場合、DOMに反映させる関数です
 */
export default function initialize() {
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
