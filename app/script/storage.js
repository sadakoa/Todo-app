/**
 * design - Model
 * localStorageを操作するファイル
 */

import $ from 'jquery';

// ========================================================================


/**
 *  keyをdataにして配列をlocalStorageにpushする関数
 */
export function sendStorage(textDataArray) {
  localStorage.setItem('data', JSON.stringify(textDataArray));
  console.log(textDataArray);
}

// ========================================================================


/**
 * 全てのデータをストレージから削除する関数
 */
export function removeAllStorage() {
  localStorage.clear();
}

// ========================================================================

/**
 * クリックされたデータをストレージから削除する関数
 */
export function removeStorage(textDataArray) {
  console.log(textDataArray);
  localStorage.setItem('data', JSON.stringify(textDataArray));
}
