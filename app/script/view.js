// =============================================================
// view.js - DOM要素に関係する処理を行う
// =============================================================

// 利用モジュール ================================================
import $ from 'jquery';               // jqueryをインポート
import * as storage from './storage'; // ローカルストレージを操作する関数
import * as modal from './modal';     // モーダルに関する関数
import * as log from './log';         // タスクログに関する関数
import * as drag from './drag';       // ドラッグ操作に関係する関数
// ============================================================

// li要素を追加していく配列
let textDataArray = JSON.parse(localStorage.getItem('data'));
// もしローカルストレージのデータが空なら初期化
if (textDataArray === null) {
  textDataArray = [];
}
// ============================================================

/**
 * addListItem - li要素を指定領域へ追加する関数
 */
export const addListItem = () => {
  // inputに記入された文字を変数に格納
  const inputValue = $('.new-task-input').val();
  // 選択されたoptionを変数に格納
  const selectValue = $('.new-task-category').val();
  const listItem = $(`
    <li class="c-sticky p-task-listarea__item">${inputValue}<a class="p-task-edit">
    <img src="images/edit.png" width="20" class="p-task-edit__img"></a></li>
  `);
  // 生成するリストエリアのIDを取得
  const listArea = $(`#${selectValue}`);
  // タスクをカードに追加
  listArea.append(listItem);
  // 配列にデータを追加
  textDataArray.push({
    text: inputValue, category: selectValue,
  });
  // 各リストの編集ボタンを変数に格納
  const EditTaskButton = $(listItem).find('.p-task-edit');
  // イベント関数の初期化
  EditTaskButton.on('click', function set() {
    const [editEl, listItemText] = [$(this), $(this).parent().text()];
    modal.openEditModal(editEl, listItem, listItemText);
  });
  // 配列のデータをストレージに送る
  storage.sendStorage(textDataArray);
  // タスクの履歴を保持する関数
  log.getTaskLog(inputValue);
  // サイドバーにタスク名前を生成する関数
  log.renderTaskLog(inputValue);
  // ドラッグ&ドロップイベントの追加
  drag.dragEvent();
  // モーダルを削除
  $('.c-modal').remove();
};

// ========================================================================

/**
 * removeAllListItem - 全てのリストを削除する関数
 */
export const removeAllListItem = () => {
  $('.p-task-listArea').empty();
  storage.removeAllStorage();
};

// =========================================================================

/**
 * renderlistItem - li要素を生成する関数
 *
 * @param  {array} storageData 配列データ
 * @param  {number} i           配列のlength用カウンタ
 */
export const renderlistItem = (storageData, i) => {
  const listItem = $(`
    <li class="c-sticky p-task-listarea__item">${storageData[i].text}<a class="p-task-edit">
    <img src="images/edit.png" width="20" class="p-task-edit__img"></a></li>
  `);
  return listItem;
};

// ========================================================================

/**
 * removeListItem - クリックされたリストを削除する関数
 *
 * @param  {string} aListItem     各リスト要素
 * @param  {string} aListItemText 各リストのテキスト要素
 */
export const removeListItem = (aListItem, aListItemText) => {
  aListItem.remove();
  $('.c-edit-modal').remove();
  $('.opacity-modal').remove();

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
};

// ========================================================================

/**
 * AgainSetEdit - 保存後に要素を書き換え、イベントを再設定する関数
 *
 * @param  {string} aListItem   各リスト要素
 * @param  {string} aInputEl    インプット要素
 * @param  {string} aTaskEditEl 各リストの編集要素
 */
const AgainSetEdit = (aListItem, aInputEl, aTaskEditEl) => {
  // 保存ボタンがクリックされたら要素の中身を変更、ストレージを修正する
  // インプットに入力された値を格納
  const newTextData = aInputEl.val();
  // リストの中身を空にして要素を再生成する
  aListItem.empty().text(newTextData).append(aTaskEditEl);

  // 各リストの編集ボタンを変数に格納
  const EditTaskButton = $(aListItem).find('.p-task-edit');
  // イベント関数の初期化
  EditTaskButton.on('click', function (evt) {
    const [editEl, listItemText] = [$(this), $(this).parent().text()];
    modal.openEditModal(editEl, aListItem, listItemText);
  });
  return newTextData;
};

// ========================================================================

/**
 * cancelEdit - リストの編集をキャンセルする関数
 *
 * @param  {string} aListItem     各リスト要素
 * @param  {string} aListItemText 各リストのテキスト要素
 * @param  {string} aTaskEditEl   各リストの編集要素
 */
const cancelEdit = (aListItem, aListItemText, aTaskEditEl) => {
  // リストの中身を空にして要素を再生成する
  aListItem.empty().text(aListItemText).append(aTaskEditEl);
  // 各リストの編集ボタンを変数に格納
  const EditTaskButton = $(aListItem).find('.p-task-edit');
  // イベント関数の初期化
  EditTaskButton.on('click', function (evt) {
    const [editEl, listItemText] = [$(this), $(this).parent().text()];
    modal.openEditModal(editEl, aListItem, listItemText);
  });
};

// ========================================================================

/**
 * putArrayData - 編集されたリストを元に配列を更新する関数
 *
 * @param  {string} aListItem     各リスト要素
 * @param  {string} aListItemText 古いリスト要素のテキスト
 * @param  {string} newTextData   新しいリスト要素のテキスト
 */
const putArrayData = (aListItem, aListItemText, newTextData) => {
  for (let i = 0; i < textDataArray.length; i++) {
    // もし配列のtextキーに当てはまる要素があったら
    if (textDataArray[i].text === $.trim(aListItemText)) {
      // 当てはまった要素の位置
      const iPos = i;

      // 配列から削除
      textDataArray.splice(iPos, 1);
      // ストレージから要素を削除
      storage.removeStorage(textDataArray);

      // リストが所属するカードのカテゴリ
      const selectValue = aListItem.parent().attr('id');
      // 削除した位置に新規で配列にデータを追加
      textDataArray.splice(iPos, 0, {
        text: newTextData, category: selectValue,
      });

      // ストレージデータを更新
      storage.sendStorage(textDataArray);
      break;
    }
  }
};

// ========================================================================

/**
 * editListItem - クリックされた要素のテキストを編集する関数
 * @param  {string} aListItem 各リスト要素
 * @param  {string} aListItemText 各リストのテキスト要素
 */
export const editListItem = (aListItem, aListItemText) => {
  modal.closeEditModal();
  // テキスト要素を変数に格納
  const textData = aListItemText;
  // 編集欄と保存ボタン要素
  const inputEl = $(`
    <input type="text" class="editText">
    <button class="c-edit-button is-create saveButton">保存</button>
    <button class="c-edit-button is-cancel cancelButton">終了</button>
  `);
  // インプットのvalueにテキスト要素を追加
  inputEl.val($.trim(textData));
  // リスト要素の中身を削除 編集内容を追加
  aListItem.empty().append(inputEl);

  // リストの編集ボタン
  const taskEditEl = $(`
    <a class="p-task-edit">
      <img src="images/edit.png" width="20" class="p-task-edit__img">
    </a>
  `);

  // 保存ボタン
  const saveButton = $('.saveButton');
  saveButton.on('click', () => {
    // 要素を書き換え、イベントを再設定する関数
    let newTextData = AgainSetEdit(aListItem, inputEl, taskEditEl);
    // 編集されたリストを元に配列を更新する関数
    putArrayData(aListItem, aListItemText, newTextData);
  });

  // キャンセルボタン
  const cancelButton = $('.cancelButton');
  cancelButton.on('click', () => {
    // 要素の編集をキャンセルする関数
    cancelEdit(aListItem, aListItemText, taskEditEl);
  });
};

// ========================================================================
