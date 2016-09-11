'usr strict'

const {getChat}         = require('./chat');
const {postMessage}     = require('./chat');
const {render}     = require('./render');

const submit = document.querySelector('#button');
const text   = document.querySelector('.text-input');
const name   = document.querySelector('.name-input');

init();

function init() {
  checkChat();
//setInterval(checkChat,5000);
  submit.addEventListener('click', postMessageGetChat, false);
}

function checkChat() {
  var stream = getChat();
  stream
    .then(function (response) {
        render(response.map(function (message) {
          return _.extend({}, message, {date: new Date(message.date)})
        }));
      }
    )
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

