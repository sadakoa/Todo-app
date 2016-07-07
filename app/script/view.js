/**
 * design - View
 * DOM操作に関係するファイル
 */

import $ from 'jquery'; // jqueryモジュール
import * as storage from './storage'; // modelを操作する関数
import * as modal from './modal'; // モーダル関数
import * as log from './log' // タスク履歴を保持する関数
import * as drag from './drag'; // ドラッグ操作する関数

// ========================================================================
// リスト要素を追加していく変数 (本番環境でletだと要素が定義されてないERRORが出るのでvarに変更)
var textDataArray = JSON.parse(localStorage.getItem('data'));

// もしローカルストレージのデータが空なら初期化
if (textDataArray === null) {
  textDataArray = [];
}
// ========================================================================


/**
 * addListItem - カードに作成したリストを追加する関数
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

  // 生成するリストエリアのIDを取得
  const listArea = ('#' + selectValue);
  // タスクをカードに追加
  $(listArea).append(listItem);

  // 配列にデータを追加
  textDataArray.push({
    text: inputValue, category: selectValue,
  });
  console.log(textDataArray);

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

  // タスクの履歴を保持する関数
  log.getTaskLog(inputValue);

  // サイドバーにタスク名前を生成する関数
  log.renderTaskLog(inputValue);

  // ドラッグ&ドロップイベントの追加
  drag.dragEvent();
}


// ========================================================================


/**
 * removeAllListItem - 全てのリストを削除する関数
 */
export function removeAllListItem() {
  $('.p-task-listArea').empty();
  storage.removeAllStorage();
}

// ========================================================================

/**
 * removeListItem - クリックされたリストを削除する関数
 *
 * @param  {type} aListItem     各リスト要素
 * @param  {type} aListItemText 各リストのテキスト要素
 */
export function removeListItem(aListItem, aListItemText) {
  aListItem.remove();
  $('.c-edit-modal').remove();
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

/**
 * AgainSetEdit - 保存後に要素を書き換え、イベントを再設定する関数
 *
 * @param  {type} aListItem   各リスト要素
 * @param  {type} aInputEl    インプット要素
 * @param  {type} aTaskEditEl 各リストの編集要素
 */
function AgainSetEdit(aListItem, aInputEl, aTaskEditEl) {
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
}
// ========================================================================


/**
 * cancelEdit - リストの編集をキャンセルする関数
 *
 * @param  {type} aListItem     各リスト要素
 * @param  {type} aListItemText 各リストのテキスト要素
 * @param  {type} aTaskEditEl   各リストの編集要素
 */
function cancelEdit(aListItem, aListItemText, aTaskEditEl) {
  // リストの中身を空にして要素を再生成する
  aListItem.empty().text(aListItemText).append(aTaskEditEl);
  // 各リストの編集ボタンを変数に格納
  const EditTaskButton = $(aListItem).find('.p-task-edit');
  // イベント関数の初期化
  EditTaskButton.on('click', function (evt) {
    const [editEl, listItemText] = [$(this), $(this).parent().text()];
    modal.openEditModal(editEl, aListItem, listItemText);
  });
}

// ========================================================================

/**
 * putArrayData - 編集されたリストを元に配列を更新する関数
 *
 * @param  {type} aListItem     各リスト要素
 * @param  {type} aListItemText 古いリスト要素のテキスト
 * @param  {type} newTextData   新しいリスト要素のテキスト
 */
function putArrayData(aListItem, aListItemText, newTextData) {
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
      console.log(selectValue); // 確認
      // 削除した位置に新規で配列にデータを追加
      textDataArray.splice(iPos, 0, {
        text: newTextData, category: selectValue,
      });
      console.log(textDataArray);

      // ストレージデータを更新
      storage.sendStorage(textDataArray);
      break;
    }
  }
}

// ========================================================================

/**
 * editListItem - クリックされた要素のテキストを編集する関数
 * @param  {type} aListItem 各リスト要素
 * @param  {type} aListItemText 各リストのテキスト要素
 */
export function editListItem(aListItem, aListItemText) {
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
  inputEl.val(textData);
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
}

// ========================================================================
