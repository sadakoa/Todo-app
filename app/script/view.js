/**
 * design - View
 * DOM操作に関係するファイル
 */

import $ from 'jquery';
import * as storage from './storage'; // localStorageを扱うモジュール
import * as modal from './modal'; // モーダル関数

// ========================================================================
// 要素を追加していく変数
let textDataArray = JSON.parse(localStorage.getItem('data'));

// もしローカルストレージのデータが空なら初期化
if(textDataArray === null) {
  textDataArray = [];
}

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

let EditTaskButton = $(listItem).find('.p-task-edit');

// イベント関数の初期化
EditTaskButton.on('click', function(evt) {
  let listItem = $(this).parent();
  let listItemText = $(this).parent().text();
  let editEl = $(this);
  modal.openEditModal(editEl, listItem, listItemText);
});
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

/**
 * クリックされたリストを削除する関数
 */
export function removeListItem(listItem, listItemText) {
  listItem.remove();
  $('.opacity-modal').remove();

  // 削除する要素のテキスト
  let a = 'a';
  // 配列の中身の数だけ処理を繰り返す
  for(let i = 0; i < textDataArray.length; i++) {

    // もし配列のtextキーに当てはまる要素があったら
    if (textDataArray[i].text == $.trim(listItemText)) {
      // 配列から削除
      console.log(`配列から${listItemText}を削除`);
      textDataArray.splice(i, 1);
      break;
    } else {
      console.log('削除ができていない');
    }
  }
  storage.removeStorage(textDataArray);
}


// ========================================================================
