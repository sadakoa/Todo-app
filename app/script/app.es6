// 利用モジュール ================================================
import $ from 'jquery'; // jqueryモジュール
import openModal from './modal.js'; // モーダル関数
// ============================================================

// 要素の初期化及び変数に格納=======================================
let newTaskButton = $('.new-task-button');
let storageData = localStorage.getItem('data');
let parseData = JSON.parse(storageData);

// ============================================================

// イベントリスナー ==============================================
newTaskButton.on('click', openModal);
// ============================================================

window.onload = () => {
  if (parseData !== null) {
    let cardArea = $('.p-task-listArea');
    let listItem = $(`
      <li class="c-sticky p-task-listarea__item">${parseData}<a class="p-task-edit">
      <img src="images/edit.png" width="20" class="p-task-edit__img"></a></li>
    `);
    cardArea.append(listItem);
  }
};
