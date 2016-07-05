/**
 * design - View
 * DOM操作に関係するファイル
 */

import $ from 'jquery';
import * as storage from './storage'; // localStorageを扱うモジュール

// ========================================================================


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
// モーダルを削除
$('.c-modal').remove();
// タスクをカードに追加
$('.p-task-listArea').append(listItem);
storage.sendStorage(inputValue);
}


/**
 * 全てのリストを削除する関数
 */
export function removeAllListItem() {
  console.log('削除されたよ全て');
  $('.p-task-listArea').empty();
storage.removeAllStorage();
}
