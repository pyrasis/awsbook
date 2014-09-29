var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

var sqs = new AWS.SQS();

var params = {
  QueueUrl: 'https://sqs.ap-northeast-1.amazonaws.com/232075047203/ExampleQueue', // 필수
  AttributeNames: [
    'ApproximateFirstReceiveTimestamp',
    'ApproximateReceiveCount',
    'SenderId',
    'SentTimestamp'
  ],
  MaxNumberOfMessages: 2,
  MessageAttributeNames: [ 'someKey1', 'someKey2', 'someKey3' ],
  VisibilityTimeout: 0,
  WaitTimeSeconds: 0
};

sqs.receiveMessage(params, function (err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
