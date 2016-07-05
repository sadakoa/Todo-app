/**
 * HTML読み込み時に実行される処理をまとめたファイル
 */

import $ from 'jquery'; // jqueryモジュール
import * as modal from './modal'; // モーダル関数
import * as view from './view'; // viewを操作する関数

// ========================================================================

/**
 * 各リストの編集モーダルを追加する関数
 */
export function setEditTaskButton() {
  // リスト要素の編集ボタンにイベントを設定
  const EditTaskButton = $('.p-task-edit');
  // リスト要素にクリックイベントを設定
  EditTaskButton.on('click', function set() {
    const [editEl, listItem, listItemText] = [$(this), $(this).parent(), $(this).parent().text()];
    modal.openEditModal(editEl, listItem, listItemText);
  });
}

// ========================================================================

/**
 * initialize - もしローカルストレージにデータがある場合、指定領域にリスト要素を生成する関数
 */
export function initialize() {
  // 配列にあるデータの取得 & 文字列からオブジェクトにパース
  const storageData = JSON.parse(localStorage.getItem('data'));
  // リストを追加する場所
  const cardArea = $('.p-backlog-card .p-task-listArea');
  // もしストレージにデータがあればリスト要素の数だけ繰り返して表示
  if (storageData !== null) {
    for (let i = 0; i < storageData.length; i++) {
      // リスト要素の生成
      const listItem = $(`
        <li class="c-sticky p-task-listarea__item">${storageData[i].text}<a class="p-task-edit">
        <img src="images/edit.png" width="20" class="p-task-edit__img"></a></li>
      `);
      // リスト要素を領域に追加
      cardArea.append(listItem);
    }

    // リスト要素の編集ボタンにイベントを設定
    setEditTaskButton();
  }
}

// ========================================================================

/**
 * setEvent - イベントリスナーの初期化をまとめた関数
 */
export function setEvent() {
  // 新規でタスクを作成するボタン
  $('.new-task-button').on('click', modal.openModal);
  // カテゴリからタスクを作成するボタン
  $('.p-task-addButton').on('click', modal.openModal);
  // 全てのタスクを削除ボタン
  $('.p-task-wholeArea__text--anchor').on('click', view.removeAllListItem);
}

// ========================================================================
