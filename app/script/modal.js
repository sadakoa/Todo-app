/**
 * design - View
 * モーダルに関するファイル
 */

import $ from 'jquery';
import * as view from './view';

/**
 * モーダル展開関数 - タスクを作成するを押した時に実行される
 * modal - コンテンツをくくっているdiv
 * modalContent - 内包する中身
 * modalCancel - モーダルを閉じるボタン
 */
const openModal = () => {
  let modal = $('<div>').addClass('c-modal').css('display', 'block');

  // モーダル中のHTMLを追加
  let modalContent = $(`
    <div class="c-modal__content"><a class="c-modal__cancel">×</a>
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
  let modalCancel = $('.c-modal__cancel');
  // 閉じるボタンを押したらモーダルを削除
  modalCancel.on('click', closeModal);

  // タスク作成ボタンを変数に格納
  let saveTaskButton = $('.new-task-saveButton');
  // 作成ボタンを押したら
  saveTaskButton.on('click', view.addListItem);
};

// ========================================================================

/**
 * モーダルを閉じる関数
 */
const closeModal = () => {
  $('.c-modal').remove();
};

// ========================================================================

module.exports = openModal;
