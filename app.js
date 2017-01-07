var express = require('express');
var httppost = require("http-post");
var sha1 = require('sha1');
var app = express();

function code(ip) {
  var a = Math.floor(Date.now() / 1800);
  var timeStampString = a.toString();
  var b = timeStampString.concat(navigator.userAgent);
  var ip = myIP();
  var c = b.concat(ip);
}

app.get('/', function (req, res) {
  res.send('Listening on port '.concat(process.env.PORT));
});
 
app.get("/getCode", function(req, res) {
 var a = Math.floor(Date.now() / 1800);
  var timeStampString = a.toString();
  var b = timeStampString.concat(req.headers['user-agent']); //fixed for express
  var ip = req.ip; //fixed for express 
  var c = b.concat(ip);
  var jsonObj = {};
  jsonObj.codeDec = sha1(c); //fixed to use node
  res.end(JSON.stringify(jsonObj));
});
function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}

function str2ab(str) {
  var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
  var bufView = new Uint8Array(buf);
  for (var i=0, strLen=str.length; i<strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
function usedCode(username, comment, cb) {
httppost("http://scratchmessagesverifier.herokuapp.com/userCode", {"username":username,"comment":comment}, {}, function(res) {
    res.on('data', function(chunk) {
        cb(ab2str(chunk));
    });
});
}
app.listen(process.env.PORT);
