var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

cloudwatch = new AWS.CloudWatch();

var params = {
  MetricData: [ // 필수
    {
      MetricName: 'Wolrd 1', // 필수
      Value: 10.0
    },
    {
      MetricName: 'Wolrd 2', // 필수
      Value: 20.0
    }
  ],
  Namespace: 'Hello' // 필수
};

cloudwatch.putMetricData(params, function (err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
