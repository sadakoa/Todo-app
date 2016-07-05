/**
 * design - View
 * DOM操作に関係するファイル
 */

import $ from 'jquery';
import * as storage from './storage'; // localStorageを扱うモジュール
import {setEditTaskButton} from './load' // モーダルを開く関数

// ========================================================================
// 要素を追加していく変数
let textDataArray = JSON.parse(localStorage.getItem('data'));

if(textDataArray === null) {
  textDataArray = [];
}

/**
 * カードに作成したリストを追加する関数
 */
export function addListItem() {

  // inputに記入された文字を変数に格納
let inputValue = $('.new-task-input').val();
// 選択されたoptionを変数に格納
let selectValue = $('.new-task-category').val();
let listItem = $(`
  <li class="c-sticky p-task-listarea__item">${inputValue}<a class="p-task-edit">
  <img src="images/edit.png" width="20" class="p-task-edit__img"></a></li>
  `);

// タスクをカードに追加
$('.p-backlog-card .p-task-listArea').append(listItem);

// 配列にデータを追加
textDataArray.push({
  text: inputValue, category: selectValue
});

// 配列のデータをストレージに送る
storage.sendStorage(textDataArray);


// モーダルを削除
$('.c-modal').remove();

// 編集モーダルを追加する
setEditTaskButton();
}

// ========================================================================

/**
 * 全てのリストを削除する関数
 */
export function removeAllListItem() {
  $('.p-task-listArea').empty();
  storage.removeAllStorage();
}

// ========================================================================
