// =============================================================
// log.js - タスク名の履歴に関係する処理を行う
// =============================================================

// 利用モジュール ================================================
import $ from 'jquery';               // jqueryをインポート
import * as storage from './storage'; // ローカルストレージを操作する関数
// =======================================================

// =============================================================
// タスクログを保持する配列
let logArray = JSON.parse(localStorage.getItem('taskLog'));
// 空なら初期化
if (logArray === null) {
  logArray = [];
}
// =============================================================

/**
 * getTaskLog - タスク履歴を保持する関数
 * @param  {string} aTaskName li要素のテキスト
 */
export const getTaskLog = (aTaskName) => {
  logArray.push({ taskName: aTaskName });
  storage.sendLogStorage(logArray);
};

// =============================================================

/**
 * renderTaskLog - 履歴を追加する関数
 * @param  {string} aTaskName li要素のテキスト
 */
export const renderTaskLog = (aTaskName) => {
  const pEl = $(`<p class="p-task-log">${aTaskName}</p>`);
  $('.log-area').append(pEl);
};

// =============================================================

/**
 * 削除ボタンがクリックされたらローカルストレージと要素を削除
 */
$('.p-task-logArea__remove').on('click', (evt) => {
  evt.preventDefault();
  storage.removeLogStorage(logArray);
  $('.log-area').empty();
});

// =============================================================
