var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

var autoscaling = new AWS.AutoScaling();

var params = {
  AutoScalingGroupNames: [
    'ExampleAutoScalingGroup'
  ]
};

autoscaling.describeAutoScalingGroups(params, function (err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
