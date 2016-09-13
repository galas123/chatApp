'usr strict'

const {getChat,postMessage}         = require('./chat');
const {render}     = require('./render');
const moment      = require('moment');

const submit = document.querySelector('#button');
const text   = document.querySelector('.text-input');
const name   = document.querySelector('.name-input');

init();

function init() {
  
  
  checkChat();
  setInterval(checkChat,5000);
  submit.addEventListener('click', postMessageGetChat, false);
}

function checkChat() {
  getChat()
    .then(render)
    .catch(function (error) {
      console.log('ошибка', error)
    })

}

function clearTextInput() {
  text.value = '';
}

function postMessageGetChat() {
  postMessage({name: name.value, text: text.value});
  checkChat();
  clearTextInput();
}

