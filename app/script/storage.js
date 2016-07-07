// =============================================================
// storage.js - ローカルストレージを操作する処理を行う
// =============================================================

/**
 * sendStorage - keyをdataにして配列をlocalStorageにpushする関数
 *
 * @param  {array} textDataArray リスト要素が格納されている配列
 */
export const sendStorage = (textDataArray) => {
  localStorage.setItem('data', JSON.stringify(textDataArray));
};

// ========================================================================

/**
 * removeAllStorage - タスクデータをストレージから削除する関数
 */
export const removeAllStorage = () => {
  localStorage.removeItem('data');
};

// ========================================================================

/**
 * removeStorage - クリックされたデータをストレージから削除する関数
 *
 * @param  {array} textDataArray 全てのデータをストレージから削除する関数
 */
export const removeStorage = (textDataArray) => {
  localStorage.setItem('data', JSON.stringify(textDataArray));
};

// ========================================================================

/**
 * sendLogStorage - タスク名をストレージに送る関数
 *
 * @param  {array} logArray タスク名の配列
 */
export const sendLogStorage = (logArray) => {
  localStorage.setItem('taskLog', JSON.stringify(logArray));
};

// ========================================================================

/**
 * removeLogStorage - タスク名をストレージから削除する関数
 *
 */
export const removeLogStorage = () => {
  localStorage.removeItem('taskLog');
};
