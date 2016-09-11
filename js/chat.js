'use strict';

const AjaxService = require('./ajaxService');

function getChat() {
  return AjaxService.loadJSON('/chat');
}


function postMessage(message) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/chat', true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  var json = JSON.stringify(_.extend({}, message, {date: new Date()}));
  xhr.send(json);
}

module.exports = {
  getChat:getChat,
  postMessage:postMessage
}
