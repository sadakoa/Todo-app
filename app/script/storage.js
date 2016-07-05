/**
 * design - Model
 * localStorageを操作するファイル
 */

import $ from 'jquery';

// ========================================================================


/**
 *  keyをdataにして配列をlocalStorageにpushする関数
 */
export function sendStorage(textData) {
  localStorage.setItem('data', JSON.stringify(textData));
}

// ========================================================================


/**
 * 全てのデータをストレージから削除する関数
 */
export function removeAllStorage() {
  localStorage.clear();
}
