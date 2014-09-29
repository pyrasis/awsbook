var fs = require('fs');
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

var s3 = new AWS.S3();

fs.readFile('./hello.jpg', function (err, data) {
  var params = {
    Bucket: 'examplebucket10', // 필수
    Key: 'hello.jpg', // 필수
    ACL: 'public-read',
    Body: data,
    ContentType: 'image/jpeg',
    Metadata: {
      someKey: 'Hello Metadata'
    },
    ServerSideEncryption: 'AES256',
    StorageClass: 'STANDARD',
  };

  s3.putObject(params, function (err, data) {
    if (err)
      console.log(err, err.stack);
    else
      console.log(data);
  });
});