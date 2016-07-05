/**
 * design - View
 * DOM操作に関係するファイル
 */

import $ from 'jquery'; // jqueryモジュール
import * as storage from './storage'; // modelを操作する関数
import * as modal from './modal'; // モーダル関数

// ========================================================================
// リスト要素を追加していく変数
let textDataArray = JSON.parse(localStorage.getItem('data'));

// もしローカルストレージのデータが空なら初期化
if (textDataArray === null) {
  textDataArray = [];
}
// ========================================================================

/**
 * カードに作成したリストを追加する関数
 */
export function addListItem() {
  // inputに記入された文字を変数に格納
  const inputValue = $('.new-task-input').val();
  // 選択されたoptionを変数に格納
  const selectValue = $('.new-task-category').val();
  const listItem = $(`
    <li class="c-sticky p-task-listarea__item">${inputValue}<a class="p-task-edit">
    <img src="images/edit.png" width="20" class="p-task-edit__img"></a></li>
  `);
  // タスクをカードに追加
  $('.p-backlog-card .p-task-listArea').append(listItem);

  // 配列にデータを追加
  textDataArray.push({
    text: inputValue, category: selectValue,
  });

  // 配列のデータをストレージに送る
  storage.sendStorage(textDataArray);

  // モーダルを削除
  $('.c-modal').remove();

  // 各リストの編集ボタンを変数に格納
  const EditTaskButton = $(listItem).find('.p-task-edit');

  // イベント関数の初期化
  EditTaskButton.on('click', function set() {
    const [editEl, listItemText] = [$(this), $(this).parent().text()];
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
export function removeListItem(aListItem, aListItemText) {
  aListItem.remove();
  $('.opacity-modal').remove();

  // 配列の中身の数だけ処理を繰り返す
  for (let i = 0; i < textDataArray.length; i++) {
    // もし配列のtextキーに当てはまる要素があったら
    if (textDataArray[i].text === $.trim(aListItemText)) {
      // 配列から削除
      textDataArray.splice(i, 1);
      break;
    }
  }
  // ストレージから要素を削除
  storage.removeStorage(textDataArray);
}

// ========================================================================
