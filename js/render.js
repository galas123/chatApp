'use strict'
const moment   = require('moment');
const template = require('raw!../template.html');

let lastMessageDate = 0;

moment.locale('ru');

module.exports = {
  render(chat){

    var newMessages = chat.filter(newMessagesFilter).map(decorateWithTime);

    appendHtmlToPage(applyTemplate(newMessages));

    var window       = document.querySelector('.chat-container');
    window.scrollTop = 9999;

    lastMessageDate = saveLastMessageDate(chat);
  }
};

function decorateWithTime(message) {

  message.dateStr = moment(message.date,'x').local().format( "HH:mm DD/MM");
  return message;
}
function newMessagesFilter(item) {
  return (item.date > lastMessageDate);
}

function appendHtmlToPage(html) {
  const wrapper     = document.createElement('div');
  wrapper.innerHTML = html;
  document.body.querySelector('.chat-container').appendChild(wrapper);
}

function applyTemplate(newMessages) {
  var tmpl = _.template(template);
  return tmpl({list: newMessages});
}

function saveLastMessageDate(chat) {
  return chat[chat.length - 1].date;
}