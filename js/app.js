'usr strict'

const {getChat,postMessage}         = require('./chat');
const {render}     = require('./render');
const moment      = require('moment');

const submit = document.querySelector('#button');
const text   = document.querySelector('.text-input');
const name   = document.querySelector('.name-input');

const colorList = document.querySelector('.dropdown-content');
const submitLogin=document.querySelector('.submit');

colorList.addEventListener('click', setColor, false);
submitLogin.addEventListener('click', startChat, false);

let nickname;
let color;


init();

function init() {
  
  
  checkChat();
  setInterval(checkChat,5000);
  submit.addEventListener('click', postMessageGetChat, false);
}

function startChat(){
  console.log('start');
  let nameInput=document.querySelector('.name-input');
  nickname= nameInput.value || 'anonym';

  let loginForm=document.querySelector('.enactive-frame');
  loginForm.classList.add('hide');


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
  postMessage({name: nickname, text: text.value, colorNickname:color});
  checkChat();
  clearTextInput();
}

function setColor(e){
  color= getComputedStyle(e.target,'').backgroundColor;
  let indicator=document.querySelector('.chosen-color-indicate');
  indicator.style.backgroundColor=color;
}

