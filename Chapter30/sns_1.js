var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

var sns = new AWS.SNS();

var params = {
  Message: 'Hello SNS Topic', // 필수
  Subject: 'Hello',
  TopicArn: 'arn:aws:sns:ap-northeast-1:232075047203:admin', // 필수
  //TargetArn: 'arn:aws:sns:ap-northeast-1:232075047203:endpoint/GCM/ExampleGCM/bae3463b-d6c0-3d81-89cf-44c5a8662de5', // 필수
};

sns.publish(params, function (err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
