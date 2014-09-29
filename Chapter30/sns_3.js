var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

var sns = new AWS.SNS();

var params = {
  TopicArn: 'arn:aws:sns:ap-northeast-1:232075047203:admin', // 필수
  //NextToken: ''
};

sns.listSubscriptionsByTopic(params, function (err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
