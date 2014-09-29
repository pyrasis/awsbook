var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

var sqs = new AWS.SQS();

var params = {
  Entries: [ // 필수
    {
      Id: 'abcd1',
      MessageBody: 'Hello SQS 1', // 필수
      DelaySeconds: 0,
      MessageAttributes: {
        someKey1: {
          DataType: 'String', // 필수
          StringValue: 'Hello String'
        }
      }
    },
    {
      Id: 'abcd2',
      MessageBody: 'Hello SQS 2', // 필수
      DelaySeconds: 0,
      MessageAttributes: {
        someKey1: {
          DataType: 'String', // 필수
          StringValue: 'Hello String'
        }
      }
    }
  ],
  QueueUrl: 'https://sqs.ap-northeast-1.amazonaws.com/232075047203/ExampleQueue', // 필수
};

sqs.sendMessageBatch(params, function (err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
