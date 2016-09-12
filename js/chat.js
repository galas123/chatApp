'use strict';

const ajaxService = require('./ajaxService');
const moment      = require('moment');

function getChat() {
  return ajaxService.loadJSON('/chat');
}


function postMessage(message) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/chat', true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  var json = JSON.stringify(_.extend({}, message, {date: moment.utc(new Date()).millisecond()}));
  xhr.send(json);
}

module.exports = {
  getChat,
  postMessage
};
