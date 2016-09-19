'use strict';

const moment = require('moment');

module.exports = {
  getChat,
  postMessage
};

function getChat() {
  return ajaxService.loadJSON('/chat');
}


function postMessage(message) {
  const body    = JSON.stringify(_.extend({}, message, {date: moment.utc(new Date()).format('x')}));
  const options = {method: 'post', body};
  ajaxService.loadJSON('/chat', options);
}


let ajaxService = {
  loadJSON: function (url, options) {
    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();

      options = options || {};

      const method = options.method || 'GET';

      xhr.open(method, url, true);

      xhr.onload = function () {
        if (xhr.status !== 200) {
          reject(xhr.status + ': ' + xhr.statusText);
        } else {
          let response = JSON.parse(xhr.responseText);

          resolve(response);
        }
      };

      xhr.onerror = function () {
        reject(xhr.status + ': ' + xhr.statusText);
      };

      xhr.send(options.body);
    })
  }
};
