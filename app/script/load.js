// =============================================================
// drag.js - リスト要素のドラッグ&ドロップに関係する処理を行う
// =============================================================

// 利用モジュール ================================================
import $ from 'jquery';           // jqueryをインポート
import * as modal from './modal'; // モーダルに関する関数
import * as view from './view';   // DOM要素に関係する関数
import * as drag from './drag';   // ドラッグ操作に関係する関数
// =============================================================

/**
 * initialize - ローカルストレージにデータがある場合、指定領域に要素を生成する関数
 */
export const initialize = () => {
  // 配列にあるデータの取得 & 文字列からオブジェクトにパース
  const storageData = JSON.parse(localStorage.getItem('data'));
  const logData = JSON.parse(localStorage.getItem('taskLog'));
  // リストを追加する場所
  const backlogArea = $('#backlog');
  const doingArea = $('#doing');
  const doneArea = $('#done');
  if (storageData !== null) {
    // 配列のkey(category)を条件分岐し、配列分処理を繰り返す
    for (let i = 0; i < storageData.length; i++) {
      if (storageData[i].category === 'backlog') {
        backlogArea.append(view.renderlistItem(storageData, i));
      }
      else if (storageData[i].category === 'doing') {
        doingArea.append(view.renderlistItem(storageData, i));
      }
      else if (storageData[i].category === 'done') {
        doneArea.append(view.renderlistItem(storageData, i));
      }
    }
  }

  // もしローカルストレージにログデータがあれば配列分生成
  if (logData !== null) {
    for (let i = 0; i < logData.length; i++) {
      let pEl = $(`<p class="p-task-log">${logData[i].taskName}</p>`);
      $('.log-area').append(pEl);
    }
  }
};


// ========================================================================

/**
 * setEditTaskButton - 各li要素に編集モーダルのイベントを追加する関数
 */
export function setEditTaskButton() {
  // li要素の編集ボタンを変数に格納
  const EditTaskButton = $('.p-task-edit');
  // リスト要素にクリックイベントを設定
  EditTaskButton.on('click', function set() {
    // 編集ボタン、li要素、li要素のテキストを変数に格納
    const [editEl, listItem, listItemText] = [$(this), $(this).parent(), $(this).parent().text()];
    // 編集モーダルを実行する
    modal.openEditModal(editEl, listItem, listItemText);
  });
}

// ========================================================================

/**
 * setEvent - イベントリスナーの初期化をまとめた関数
 */
export const setEvent = () => {
  // 新規でタスクを作成するボタン
  $('.new-task-button').on('click', modal.openModal);
  // カテゴリからタスクを作成するボタン
  $('.p-task-addButton').on('click', function(e) {
    let buttonId = $(this).attr('id');
    console.log(buttonId);
    modal.openModal(buttonId);
  });
  // 全てのタスクを削除ボタン
  $('.p-task-wholeArea__text--anchor').on('click', view.removeAllListItem);
  // li要素の編集ボタンにイベントを設定
  setEditTaskButton();
  // li要素にドラッグイベントを設定
  drag.dragEvent();
};

// ========================================================================
