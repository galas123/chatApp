'use strict'

var template = require('raw!../template.html');
var lastMessageDate=new Date(0);
var result;


module.exports = {
  render(chat){

    var newMessages = chat.filter(newMessagesFilter).map(decorateWithTime);
    lastMessageDate=saveLastMessageDate(chat);
    addMessage(applyTemplate(newMessages));
    window.scrollTop = 9999;
  }
}

function decorateWithTime(message) {
  var messageDate = message.date;
  var curr_date   = messageDate.getDate();
  var curr_month  = messageDate.getMonth() + 1;
  var curr_year   = messageDate.getFullYear();
  var curr_hour   = messageDate.getHours();
  var curr_min    = messageDate.getMinutes();
  message.dateStr = curr_year + "-" + curr_month + "-" + curr_date + ' ' + curr_hour + ':' + curr_min;
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
  var window = document.querySelector('.chat-container');
  var tmpl   = _.template(template);
  return tmpl({list: newMessages});

}

function saveLastMessageDate(chat){
  return chat[chat.length - 1].date;
}