/**
 * design - Model
 * localStorageを操作するファイル
 */

// ========================================================================

/**
 * sendStorage - keyをdataにして配列をlocalStorageにpushする関数
 *
 * @param  {type} textDataArray リスト要素が格納されている配列
 */
export function sendStorage(textDataArray) {
  localStorage.setItem('data', JSON.stringify(textDataArray));
}

// ========================================================================

/**
 * removeAllStorage - 全てのデータをストレージから削除する関数
 */
export function removeAllStorage() {
  localStorage.clear();
}

// ========================================================================

/**
 * removeStorage - クリックされたデータをストレージから削除する関数
 *
 * @param  {type} textDataArray 全てのデータをストレージから削除する関数
 */
export function removeStorage(textDataArray) {
  localStorage.setItem('data', JSON.stringify(textDataArray));
}
