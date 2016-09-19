'usr strict'

const moment = require('moment');
const {getChat, postMessage}         = require('./ajaxService');
const {render}     = require('./render');

const textInput = document.querySelector('.text-input');
let nickname;
let color;

init();

function init() {
  checkChat();
  setInterval(checkChat, 1000);

  const colorList   = document.querySelector('.dropdown-content');
  colorList.addEventListener('click', setColor, false);
  
  const submitLogin = document.querySelector('.submit');
  submitLogin.addEventListener('click', startChat, false);

  const submit = document.querySelector('#button');
  submit.addEventListener('click', postMessageGetChat, false);
}

function startChat() {
  const nameInput = document.querySelector('.name-input');
  nickname      = nameInput.value || 'anonym';
  const loginForm = document.querySelector('.enactive-frame');
  loginForm.classList.add('hide');
  postMessage({
    name: nickname, 
    text: '', 
    colorNickname: color, 
    type: 'enter'
  });
}

function checkChat() {
  getChat()
    .then(render)
    .catch(function (error) {
      console.log('ошибка', error)
    });
}

function clearTextInput() {
  textInput.value = '';
}

function postMessageGetChat() {
  postMessage({
    name: nickname,
    text: textInput.value, 
    colorNickname: color
  });
  checkChat();
  clearTextInput();
}

function setColor(e) {
  color                           = getComputedStyle(e.target, '').backgroundColor;
  const indicator                   = document.querySelector('.chosen-color-indicate');
  indicator.style.backgroundColor = color;
}

