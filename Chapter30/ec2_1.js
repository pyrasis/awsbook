var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

ec2 = new AWS.EC2();

var params = {
  Filters: [
    {
      Name: 'availability-zone',
      Values: [
        'ap-northeast-1a',
      ]
    }
  ],
  InstanceIds: [ 'i-0e7abc17', 'i-4d7bbd54' ]
};

ec2.describeInstances(params, function (err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
