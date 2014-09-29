var express = require('express');
var app = express();

app.get(['/', '/index.html'], function (req, res) {
  res.send('Hello CloudFront – EC2');
});

app.listen(80);
