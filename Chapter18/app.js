var express = require('express');
var app = express();

app.get(['/', '/index.html'], function (req, res) {
  res.send('Hello ELB 1'); // 두 번째 EC2 인스턴스에서는 Hello ELB 2
});

app.listen(80);
