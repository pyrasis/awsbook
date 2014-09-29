var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

var sqs = new AWS.SQS();

var params = {
  MessageBody: 'Hello SQS', // 필수
  QueueUrl: 'https://sqs.ap-northeast-1.amazonaws.com/232075047203/ExampleQueue', // 필수
  DelaySeconds: 0,
  MessageAttributes: {
    someKey1: {
      DataType: 'String', // 필수
      StringValue: 'Hello String'
    },
    someKey2: {
      DataType: 'Number', // 필수
      StringValue: '10'
    },
    someKey3: {
      DataType: 'Binary', // 필수
      BinaryValue: new Buffer([1, 2, 3, 4])
    }
  }
};

sqs.sendMessage(params, function (err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
