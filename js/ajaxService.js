'use strict';

module.exports = {
  
  loadJSON(url, options) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();

      options = options || {};

      let method = options.method || 'GET';

      xhr.open(method, url, true);

      xhr.onload = function() {
        if (xhr.status !== 200) {
          reject( xhr.status + ': ' + xhr.statusText );
        } else {
          let response = JSON.parse(xhr.responseText);

          resolve(response);
        }
      };

      xhr.onerror = function() {
        reject( xhr.status + ': ' + xhr.statusText );
      };

      xhr.send();
    });
  }
};