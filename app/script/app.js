// 利用モジュール ================================================
import $ from 'jquery'; // jqueryモジュール
import openModal from './modal'; // モーダル関数
import {initialize, setEvent} from './load'; // HTML読み込み後の実行関数
import {removeAllListItem} from './view'; // viewを操作する関数
// ============================================================

// 初期化及びHTML読み込み時に実行 =================================
window.onload = () => {
  initialize();
  setEvent();
};
// ============================================================

// 要素の初期化及び変数に格納======================================
// 新規でタスクを作成するボタン
let newTaskButton = $('.new-task-button');
newTaskButton.on('click', openModal);

// カテゴリからタスクを作成するボタン
let addTaskButton = $('.p-task-addButton');
addTaskButton.on('click', openModal);

// 全てのタスクを削除ボタン
let removeAllButton = $('.p-task-wholeArea__text--anchor');
removeAllButton.on('click', removeAllListItem);
// ============================================================
