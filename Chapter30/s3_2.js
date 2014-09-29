var fs = require('fs');
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

var s3 = new AWS.S3();

var params = {
  Bucket: 'examplebucket10', // 필수
  Key: 'hello.jpg', // 필수
};

s3.getObject(params, function (err, data) {
  if (err)
    console.log(err, err.stack);
  else {
    console.log(data);
    fs.writeFile('./hello.jpg', data.Body);
  }
});