var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

var sns = new AWS.SNS();

var message = {
  default: 'Hello SNS Topic',
  email: 'Hello SNS email',
  sqs: 'Hello SNS SQS', 
  http: 'Hello SNS http',
  APNS: {
    aps: {
      alert: 'Hello SNS APNS',
      sound: 'default'
    }
  },
  GCM: {
    data: {
      message: 'Hello SNS GCM'
    }
  }
};

var params = {
  Message: JSON.stringify(message), // 필수
  TopicArn: 'arn:aws:sns:ap-northeast-1:232075047203:admin', // 필수
  MessageStructure: 'json'
};

sns.publish(params, function (err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
