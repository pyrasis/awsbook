var AWS = require('aws-sdk')
  , Sequelize = require('sequelize')
  , im = require('imagemagick')
  , mime = require('mime')
  , s3 = new AWS.S3({ region: 'ap-northeast-1' })
  , sqs = new AWS.SQS({ region: 'ap-northeast-1' });

var s3Bucket = 'examplephoto.image';
var sqsQueueUrl = 'https://sqs.ap-northeast-1.amazonaws.com/232075047203/ExamplePhotoQueue';
var rdsEndpoint = {
  host: 'examplephoto.cnlconsezo7y.ap-northeast-1.rds.amazonaws.com',
  port: 3306
};

// MySQL DB 이름, 계정, 암호
var sequelize = new Sequelize('examplephoto', 'admin', 'adminpassword', {
  host: rdsEndpoint.host,
  port: rdsEndpoint.port
});

// MySQL DB 테이블 정의
var Photo = sequelize.define('Photo', {
  filename: { type: Sequelize.STRING, allowNull: false, unique: true }
});

// SQS 메시지 삭제
function deleteMessage(ReceiptHandle) {
  sqs.deleteMessage({
    QueueUrl: sqsQueueUrl,
    ReceiptHandle: ReceiptHandle
  }, function (err, data) {
    if (err)
      console.log(err, err.stack);
    else
      console.log(data);
  });
}

// MySQL에 데이터 저장
function insertPhoto(filename) {
  sequelize.sync().success(function () {
    Photo.create({
      filename: filename
    });
  });
}

// SQS 메시지 받기
function receiveMessage() {
  sqs.receiveMessage({
    QueueUrl: sqsQueueUrl,
    MaxNumberOfMessages: 1,
    VisibilityTimeout: 10,
    WaitTimeSeconds: 10
  }, function (err, data) {
    if (!err && data.Messages && data.Messages.length > 0)
      resizeImage(data.Messages[0]);
    else if (err)
      console.log(err, err.stack);
    receiveMessage();
  });
}

// 이미지 해상도 변환
function resizeImage(Message) {
  var filename = Message.Body;
  s3.getObject({
    Bucket: s3Bucket,
    Key: 'original/' + filename
  }, function (err, data) {
    im.resize({
      srcData: data.Body,
      width: 800
    }, function (err, stdout, stderr) {
      s3.putObject({
        Bucket: s3Bucket,
        Key: 'resized/' + filename,
        Body: new Buffer(stdout, 'binary'),
        ACL: 'public-read',
        ContentType: mime.lookup(filename)
      }, function (err, data) {
        console.log('Complete resize ' + filename);
        deleteMessage(Message.ReceiptHandle);
        insertPhoto(filename);
      });
    });
  });
}

receiveMessage();