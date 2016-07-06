/**
 * モーダルに関するファイル
 */

import $ from 'jquery'; // jqueryモジュール
import * as view from './view'; // viewを操作する関数

// ========================================================================

/**
 * モーダルを閉じる関数
 */
const closeModal = () => {
  $('.c-modal').remove();
};

// ========================================================================

/**
 * モーダル展開関数 - タスクを作成するを押した時に実行される
 * modal - コンテンツをくくっているdiv
 * modalContent - 内包する中身
 * modalCancel - モーダルを閉じるボタン
 */

export function openModal() {
  const modal = $('<div>').addClass('c-modal').css('display', 'block');

  // モーダル中のHTMLを追加
  const modalContent = $(`
    <div class="c-modal__content">
      <a class="c-modal__cancel">×</a>
      <h3 class="c-modal__title">タスクを作成する</h3>
      <div class="new-task-area">
        <input placeholder="タスク名を書いてください" class="new-task-input">
        <select class="new-task-category">
          <option value="backlog">Backlog</option>
          <option value="doing">Doing</option>
        </select>
      </div>
      <button class="c-button is-create new-task-saveButton">タスクを作成</button>
    </div>
  `);
  // modalContentをmodalの中に追加
  $(modal).append(modalContent);
  // .l-wrapperの前に要素を生成
  $('.l-wrapper').before(modal);

  // モーダルの閉じるボタンを変数に格納
  const modalCancel = $('.c-modal__cancel');
  // 閉じるボタンを押したらモーダルを削除
  modalCancel.on('click', closeModal);

  // タスク作成ボタンを変数に格納
  const saveTaskButton = $('.new-task-saveButton');
  // 作成ボタンを押したら
  saveTaskButton.on('click', view.addListItem);
}

// ========================================================================

/**
 * closeEditModal - リストのモーダルを削除する関数
 */
export function closeEditModal() {
  $('.c-edit-modal').remove();
  $('.opacity-modal').remove();
}

// ========================================================================

/**
 * openEditModal - 各リストの編集ボタンを展開するモーダル
 *
 * @param  {type} editEl       各リスト毎の編集ボタン
 * @param  {type} listItem     各リスト要素
 * @param  {type} listItemText 各リストのテキスト要素
 */
export function openEditModal(editEl, listItem, listItemText) {
  const opacityModal = $('<div>').addClass('opacity-modal').css('display', 'block');
  const modal = $('<div>').addClass('c-edit-modal').css('display', 'block');
  const modalContent = $(`
    <a href="" class="c-edit-modal__text is-edit">編集</a>
    <a href="" class="c-edit-modal__text is-remove">削除</a>
  `);
  // 要素を追加
  modal.append(modalContent);
  // モーダルをリスト要素の中に追加
  editEl.before(modal);
  // 透明な領域をbodyの上に追加
  $('.l-wrapper').before(opacityModal);

  // 指定領域以外クリックしたらモーダルを閉じる
  $(opacityModal).on('click', closeEditModal);

  // ------------------------------------------------
  // 削除ボタンを変数に格納
  const removeListItemButton = $('.is-remove');
  removeListItemButton.on('click', function set(evt) {
    // a要素のHTMLイベントをキャンセル
    evt.preventDefault();
    // クリックされたリストを削除する関数
    view.removeListItem(listItem, listItemText);
  });

  // ------------------------------------------------
  // 編集ボタンを変数に格納
  const editListItemButton = $('.is-edit');
  editListItemButton.on('click', function set(evt) {
    // a要素のHTMLイベントをキャンセル
    evt.preventDefault();
    // クリックされた要素のテキストを編集する関数
    view.editListItem(listItem, listItemText);
  });
}

// ========================================================================
