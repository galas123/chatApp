'use strict'
var moment = require('moment');
var template = require('raw!../template.html');
var now = moment();
moment.lang('ru');
console.log(now.format('dddd, MMMM DD YYYY, h:mm:ss'));
var lastMessageDate=moment([2000, 9, 31]);
var result;


module.exports = {
  render(chat){

    var newMessages = chat.filter(newMessagesFilter).map(decorateWithTime);
    lastMessageDate=saveLastMessageDate(chat);
    addMessage(applyTemplate(newMessages));
    window.scrollTop = 9999;
  }
};

function decorateWithTime(message) {
  message.dateStr = moment().milliseconds(message.date).local().format( "DD MM HH:mm");
  return message;
}
function newMessagesFilter(item) {
  return (item.date > lastMessageDate);
}

function addMessage (result){
  var div       = document.createElement('div');
  div.innerHTML = result;
  document.body.querySelector('.chat-container').appendChild(div);

}
function applyTemplate(newMessages){
  var tmpl   = _.template(template);
  return tmpl({list: newMessages});

}

function saveLastMessageDate(chat){
  return chat[chat.length - 1].date;
}