var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

var sns = new AWS.SNS();

var params = {
  SubscriptionArn: 'arn:aws:sns:ap-northeast-1:232075047203:admin:748d2cf0-2794-4eb6-b26b-3bd10606cda5' // 필수
};

sns.unsubscribe(params, function (err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
