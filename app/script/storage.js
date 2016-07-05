/**
 * design - Model
 * localStorageを操作するファイルです
 */

import $ from 'jquery';

// ========================================================================


// keyをdataにして配列をlocalStorageにpushする関数
export function sendStorage(textData) {
  localStorage.setItem('data', JSON.stringify(textData));
}
