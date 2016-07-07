// =============================================================
// modal.js - モーダル表示に関係する処理を行う
// =============================================================

// 利用モジュール ================================================
import $ from 'jquery';         // jqueryをインポート
import * as view from './view'; // DOM要素に関係する関数

// ========================================================================

/**
 * closeModal - モーダルを閉じる関数
 */
const closeModal = () => {
  $('.c-modal').remove();
};

// ========================================================================

/**
 * renderModal - モーダルを生成する関数
 */
const renderModal = () => {
  const modal = $('<div>').addClass('c-modal').css('display', 'block');
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
  $(modal).append(modalContent);
  $('.l-wrapper').before(modal);
};

// ========================================================================

/**
 * openModal - モーダルを開く関数
 */
export const openModal = () => {
  renderModal();
  const modalCancel = $('.c-modal__cancel');
  // 閉じるボタンを押したらモーダルを削除
  modalCancel.on('click', closeModal);

  // タスク作成ボタンを変数に格納
  const saveTaskButton = $('.new-task-saveButton');
  // 作成ボタンを押したら要素を指定領域へ生成
  saveTaskButton.on('click', view.addListItem);
};

// ========================================================================

/**
 * closeEditModal - 編集モーダルを削除する関数
 */
export const closeEditModal = () => {
  $('.c-edit-modal').remove();
  $('.opacity-modal').remove();
};

// ========================================================================


/**
 * renderEditModal - 編集モーダルを生成する関数
 */
const renderEditModal = (editEl) => {
  const posY = editEl.offset().top;
  const posX = editEl.offset().left;
  const opacityModal = $('<div>').addClass('opacity-modal').css('display', 'block');
  const modal = $('<div>').addClass('c-edit-modal').css({ top: posY, left: posX });
  const modalContent = $(`
    <a href="" class="c-edit-modal__text is-edit">編集</a>
    <a href="" class="c-edit-modal__text is-remove">削除</a>
  `);
  // 要素を追加
  modal.append(modalContent);
  // モーダルをリスト要素の中に追加
  $('body').before(modal);
  // 透明な領域をbodyの上に追加
  $('.l-wrapper').before(opacityModal);
  // 指定領域以外クリックしたらモーダルを閉じる
  $(opacityModal).on('click', closeEditModal);
};

// ========================================================================

/**
 * openEditModal - 編集モーダルを開く関数
 *
 * @param  {type} editEl       各リスト毎の編集ボタン
 * @param  {type} listItem     各リスト要素
 * @param  {type} listItemText 各リストのテキスト要素
 */
export const openEditModal = (editEl, listItem, listItemText) => {
  // モーダル要素を生成
  renderEditModal(editEl);
  // 削除ボタンを変数に格納
  const removeListItemButton = $('.is-remove');
  removeListItemButton.on('click', (evt) => {
    // a要素のHTMLイベントをキャンセル
    evt.preventDefault();
    // クリックされたリストを削除する関数
    view.removeListItem(listItem, listItemText);
  });
  // 編集ボタンを変数に格納
  const editListItemButton = $('.is-edit');
  editListItemButton.on('click', (evt) => {
    // a要素のHTMLイベントをキャンセル
    evt.preventDefault();
    // クリックされた要素のテキストを編集する関数
    view.editListItem(listItem, listItemText);
  });
  $('.c-sticky').removeClass('list-position');
};

// ========================================================================
