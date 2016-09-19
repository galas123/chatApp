var http = require('http');
var url = require('url');
var querystring = require('querystring');
var static = require('node-static');
var file = new static.Server('.', {
  cache: 0
});
var messages = [];


function accept(req, res) {

  if (req.url === '/chat') {
    if(req.method === 'GET'){
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify(messages));
    }else{
      var data = '';
      req.on('data', function(chunk) {
        data += chunk.toString();
      });
      req.on('end', function() {
        console.log(data);
        messages.push(JSON.parse(data));
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(messages));
      });

    }
  } else {
    file.serve(req, res);
  }
}

if (!module.parent) {
  http.createServer(accept).listen(8080);
} else {
  exports.accept = accept;
}
