var express = require('express');
var httppost = require("http-post");
var xor = require('base64-xor');
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
  jsonObj.codeEnc = xor.encode(process.env.secret, process.env.magic.concat(sha1(c)));
  res.end(JSON.stringify(jsonObj));
});

app.post("/verifyCode", function(req, res) {
  try {
    if (req.params.enc == xor.encode(process.env.secret, process.env.magic.concat(req.params.dec))) {
    //usedCode(req.params.username, req.params.dec)
    httppost("http://scratchmessagesverifier.herokuapp.com/userCode", {"username":username,"comment":comment}, {}, function(resb) {
    resb.on('data', function(chunk) {
        res.end(ab2str(chunk));
    }
    });
    } else {
      res.end("false");
    }
  } catch (ex) {
    res.end("false");
  }
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

app.listen(process.env.PORT);
