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
 * removeAllStorage - タスクデータをストレージから削除する関数
 */
export function removeAllStorage() {
  localStorage.removeItem('data');
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

// ========================================================================


/**
 * sendLogStorage - タスク名をストレージに送る関数
 *
 * @param  {type} logArray タスク名の配列
 */
export function sendLogStorage(logArray) {
  localStorage.setItem('taskLog', JSON.stringify(logArray));
}

// ========================================================================

export function removeLogStorage(logArray) {
  localStorage.removeItem('taskLog');
}
