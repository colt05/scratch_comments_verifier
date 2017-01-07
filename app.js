var express = require('express');
var httppost = require("http-post");
var app = express();
 
app.get('/', function (req, res) {
  res.send('Listening on port '.concat(process.env.PORT));
})
 
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
app.listen(proccess.env.PORT);
