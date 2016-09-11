/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'usr strict'
	
	const {getChat}         = __webpack_require__(1);
	const {postMessage}     = __webpack_require__(1);
	const {render}     = __webpack_require__(3);
	
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
	


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	const AjaxService = __webpack_require__(2);
	
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


/***/ },
/* 2 */
/***/ function(module, exports) {

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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var template = __webpack_require__(4);
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

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "<% list.forEach(function(item){ %>\r\n<div class=\"text-message\">\r\n    <span class=\"name-message\">\r\n        <%=item.name %>:\r\n    </span>\r\n    <span>\r\n        <%=item.text %>\r\n    </span>\r\n    <span class=\"date\">\r\n        <%=item.dateStr %>\r\n    </span>\r\n</div>\r\n<%}); %>\r\n\r\n"

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGMyMWEyZmIwZmI5MDNkOTUxNmMiLCJ3ZWJwYWNrOi8vLy4vYXBwLmpzIiwid2VicGFjazovLy8uL2NoYXQuanMiLCJ3ZWJwYWNrOi8vLy4vYWpheFNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vcmVuZGVyLmpzIiwid2VicGFjazovLy8uLi90ZW1wbGF0ZS5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBOztBQUVBLFFBQU8sUUFBUTtBQUNmLFFBQU8sWUFBWTtBQUNuQixRQUFPLE9BQU87O0FBRWQ7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE0QixZQUFZLDZCQUE2QjtBQUNyRSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFlLG1DQUFtQztBQUNsRDtBQUNBO0FBQ0E7Ozs7Ozs7O0FDekNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsMERBQXlEO0FBQ3pELHdDQUF1QyxZQUFZLGlCQUFpQjtBQUNwRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDcEJBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQUs7QUFDTDtBQUNBLEc7Ozs7OztBQy9CQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsa0JBQWtCOztBQUVqQzs7QUFFQTtBQUNBO0FBQ0EsRTs7Ozs7O0FDOUNBLGtEQUFpRCxzUUFBc1EsRUFBRSxZIiwiZmlsZSI6ImJ1aWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBkYzIxYTJmYjBmYjkwM2Q5NTE2Y1xuICoqLyIsIid1c3Igc3RyaWN0J1xyXG5cclxuY29uc3Qge2dldENoYXR9ICAgICAgICAgPSByZXF1aXJlKCcuL2NoYXQnKTtcclxuY29uc3Qge3Bvc3RNZXNzYWdlfSAgICAgPSByZXF1aXJlKCcuL2NoYXQnKTtcclxuY29uc3Qge3JlbmRlcn0gICAgID0gcmVxdWlyZSgnLi9yZW5kZXInKTtcclxuXHJcbmNvbnN0IHN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidXR0b24nKTtcclxuY29uc3QgdGV4dCAgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtaW5wdXQnKTtcclxuY29uc3QgbmFtZSAgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hbWUtaW5wdXQnKTtcclxuXHJcbmluaXQoKTtcclxuXHJcbmZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgY2hlY2tDaGF0KCk7XHJcbi8vc2V0SW50ZXJ2YWwoY2hlY2tDaGF0LDUwMDApO1xyXG4gIHN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBvc3RNZXNzYWdlR2V0Q2hhdCwgZmFsc2UpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja0NoYXQoKSB7XHJcbiAgdmFyIHN0cmVhbSA9IGdldENoYXQoKTtcclxuICBzdHJlYW1cclxuICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgIHJlbmRlcihyZXNwb25zZS5tYXAoZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuICAgICAgICAgIHJldHVybiBfLmV4dGVuZCh7fSwgbWVzc2FnZSwge2RhdGU6IG5ldyBEYXRlKG1lc3NhZ2UuZGF0ZSl9KVxyXG4gICAgICAgIH0pKTtcclxuICAgICAgfVxyXG4gICAgKVxyXG4gICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZygn0L7RiNC40LHQutCwJywgZXJyb3IpXHJcbiAgICB9KVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJUZXh0SW5wdXQoKSB7XHJcbiAgdGV4dC52YWx1ZSA9ICcnO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwb3N0TWVzc2FnZUdldENoYXQoKSB7XHJcbiAgcG9zdE1lc3NhZ2Uoe25hbWU6IG5hbWUudmFsdWUsIHRleHQ6IHRleHQudmFsdWV9KTtcclxuICBjaGVja0NoYXQoKTtcclxuICBjbGVhclRleHRJbnB1dCgpO1xyXG59XHJcblxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vYXBwLmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgQWpheFNlcnZpY2UgPSByZXF1aXJlKCcuL2FqYXhTZXJ2aWNlJyk7XHJcblxyXG5mdW5jdGlvbiBnZXRDaGF0KCkge1xyXG4gIHJldHVybiBBamF4U2VydmljZS5sb2FkSlNPTignL2NoYXQnKTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHBvc3RNZXNzYWdlKG1lc3NhZ2UpIHtcclxuICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgeGhyLm9wZW4oJ1BPU1QnLCAnL2NoYXQnLCB0cnVlKTtcclxuICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKTtcclxuICB2YXIganNvbiA9IEpTT04uc3RyaW5naWZ5KF8uZXh0ZW5kKHt9LCBtZXNzYWdlLCB7ZGF0ZTogbmV3IERhdGUoKX0pKTtcclxuICB4aHIuc2VuZChqc29uKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgZ2V0Q2hhdDpnZXRDaGF0LFxyXG4gIHBvc3RNZXNzYWdlOnBvc3RNZXNzYWdlXHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2NoYXQuanNcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBcclxuICBsb2FkSlNPTih1cmwsIG9wdGlvbnMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblxyXG4gICAgICBsZXQgbWV0aG9kID0gb3B0aW9ucy5tZXRob2QgfHwgJ0dFVCc7XHJcblxyXG4gICAgICB4aHIub3BlbihtZXRob2QsIHVybCwgdHJ1ZSk7XHJcblxyXG4gICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHhoci5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICAgICAgcmVqZWN0KCB4aHIuc3RhdHVzICsgJzogJyArIHhoci5zdGF0dXNUZXh0ICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGxldCByZXNwb25zZSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcblxyXG4gICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZWplY3QoIHhoci5zdGF0dXMgKyAnOiAnICsgeGhyLnN0YXR1c1RleHQgKTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHhoci5zZW5kKCk7XHJcbiAgICB9KTtcclxuICB9XHJcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2FqYXhTZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCdyYXchLi4vdGVtcGxhdGUuaHRtbCcpO1xyXG52YXIgbGFzdE1lc3NhZ2VEYXRlPW5ldyBEYXRlKDApO1xyXG52YXIgcmVzdWx0O1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIHJlbmRlcihjaGF0KXtcclxuXHJcbiAgICB2YXIgbmV3TWVzc2FnZXMgPSBjaGF0LmZpbHRlcihuZXdNZXNzYWdlc0ZpbHRlcikubWFwKGRlY29yYXRlV2l0aFRpbWUpO1xyXG4gICAgbGFzdE1lc3NhZ2VEYXRlPXNhdmVMYXN0TWVzc2FnZURhdGUoY2hhdCk7XHJcbiAgICBhZGRNZXNzYWdlKGFwcGx5VGVtcGxhdGUobmV3TWVzc2FnZXMpKTtcclxuICAgIHdpbmRvdy5zY3JvbGxUb3AgPSA5OTk5O1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZGVjb3JhdGVXaXRoVGltZShtZXNzYWdlKSB7XHJcbiAgdmFyIG1lc3NhZ2VEYXRlID0gbWVzc2FnZS5kYXRlO1xyXG4gIHZhciBjdXJyX2RhdGUgICA9IG1lc3NhZ2VEYXRlLmdldERhdGUoKTtcclxuICB2YXIgY3Vycl9tb250aCAgPSBtZXNzYWdlRGF0ZS5nZXRNb250aCgpICsgMTtcclxuICB2YXIgY3Vycl95ZWFyICAgPSBtZXNzYWdlRGF0ZS5nZXRGdWxsWWVhcigpO1xyXG4gIHZhciBjdXJyX2hvdXIgICA9IG1lc3NhZ2VEYXRlLmdldEhvdXJzKCk7XHJcbiAgdmFyIGN1cnJfbWluICAgID0gbWVzc2FnZURhdGUuZ2V0TWludXRlcygpO1xyXG4gIG1lc3NhZ2UuZGF0ZVN0ciA9IGN1cnJfeWVhciArIFwiLVwiICsgY3Vycl9tb250aCArIFwiLVwiICsgY3Vycl9kYXRlICsgJyAnICsgY3Vycl9ob3VyICsgJzonICsgY3Vycl9taW47XHJcbiAgcmV0dXJuIG1lc3NhZ2U7XHJcbn1cclxuZnVuY3Rpb24gbmV3TWVzc2FnZXNGaWx0ZXIoaXRlbSkge1xyXG4gIHJldHVybiAoaXRlbS5kYXRlID4gbGFzdE1lc3NhZ2VEYXRlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkTWVzc2FnZSAocmVzdWx0KXtcclxuICB2YXIgZGl2ICAgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgZGl2LmlubmVySFRNTCA9IHJlc3VsdDtcclxuICBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoJy5jaGF0LWNvbnRhaW5lcicpLmFwcGVuZENoaWxkKGRpdik7XHJcblxyXG59XHJcbmZ1bmN0aW9uIGFwcGx5VGVtcGxhdGUobmV3TWVzc2FnZXMpe1xyXG4gIHZhciB3aW5kb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2hhdC1jb250YWluZXInKTtcclxuICB2YXIgdG1wbCAgID0gXy50ZW1wbGF0ZSh0ZW1wbGF0ZSk7XHJcbiAgcmV0dXJuIHRtcGwoe2xpc3Q6IG5ld01lc3NhZ2VzfSk7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBzYXZlTGFzdE1lc3NhZ2VEYXRlKGNoYXQpe1xyXG4gIHJldHVybiBjaGF0W2NoYXQubGVuZ3RoIC0gMV0uZGF0ZTtcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9yZW5kZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPCUgbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0peyAlPlxcclxcbjxkaXYgY2xhc3M9XFxcInRleHQtbWVzc2FnZVxcXCI+XFxyXFxuICAgIDxzcGFuIGNsYXNzPVxcXCJuYW1lLW1lc3NhZ2VcXFwiPlxcclxcbiAgICAgICAgPCU9aXRlbS5uYW1lICU+OlxcclxcbiAgICA8L3NwYW4+XFxyXFxuICAgIDxzcGFuPlxcclxcbiAgICAgICAgPCU9aXRlbS50ZXh0ICU+XFxyXFxuICAgIDwvc3Bhbj5cXHJcXG4gICAgPHNwYW4gY2xhc3M9XFxcImRhdGVcXFwiPlxcclxcbiAgICAgICAgPCU9aXRlbS5kYXRlU3RyICU+XFxyXFxuICAgIDwvc3Bhbj5cXHJcXG48L2Rpdj5cXHJcXG48JX0pOyAlPlxcclxcblxcclxcblwiXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L3Jhdy1sb2FkZXIhLi4vdGVtcGxhdGUuaHRtbFxuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=