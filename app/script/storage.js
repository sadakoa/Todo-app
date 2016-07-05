/**
 * design - Model
 * localStorageを操作するファイル
 */

// ========================================================================


/**
 *  keyをdataにして配列をlocalStorageにpushする関数
 */
export function sendStorage(textDataArray) {
  localStorage.setItem('data', JSON.stringify(textDataArray));
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
  localStorage.setItem('data', JSON.stringify(textDataArray));
}
