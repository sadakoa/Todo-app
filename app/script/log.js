/**
 * サイドバーにタスクを作ったログを表示させるファイル
 */

import $ from 'jquery'; // jqueryモジュール
import * as storage from './storage'; // modelを操作する関数

// =======================================================

// タスクログを保持する配列
let logArray = JSON.parse(localStorage.getItem('taskLog'));

// 空なら初期化
if (logArray === null) {
  logArray = [];
}

/**
 * getTaskLog - タスク履歴を保持する関数
 * @param  {type} aTaskName 各リストの名前
 */
export function getTaskLog(aTaskName) {
  logArray.push({
    taskName: aTaskName,
  });
  storage.sendLogStorage(logArray);
}


/**
 * renderTaskLog - 履歴を追加する関数
 * @param  {type} aTaskName 各タスクの名前
 */
export function renderTaskLog(aTaskName) {
  const pEl = $(`
    <p class="p-task-log">${aTaskName}</p>
  `);
  $('.log-area').append(pEl);
}


/**
 * 削除ボタンをクリックされたらストレージと履歴を削除
 */
$('.p-task-logArea__remove').on('click', function(evt) {
  evt.preventDefault();
  storage.removeLogStorage(logArray);
  $('.log-area').empty();
});
