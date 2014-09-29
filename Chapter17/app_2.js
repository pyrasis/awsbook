var express = require('express');
var app = express();

app.get(['/', '/index.html'], function (req, res) {
  res.send('EC2 Secondary');
});

app.listen(80);
