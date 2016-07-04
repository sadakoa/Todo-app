import $ from 'jquery';

const sendStorage = (textData) => {
  localStorage.setItem('data', JSON.stringify(textData));
};

module.exports = sendStorage;
