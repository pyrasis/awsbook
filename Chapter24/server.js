var express = require('express')
  , http = require('http')
  , app = express();

app.get(['/', '/index.html'], function (req, res) {
    res.send('Hello OpsWorks');
});

http.createServer(app).listen(80);
