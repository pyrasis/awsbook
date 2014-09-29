var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

ec2 = new AWS.EC2();

var params = {
  ImageId: 'ami-25dd9324',  // 필수
  MaxCount: 1,  // 필수
  MinCount: 1,  // 필수
  Monitoring: { // 필수
    Enabled: false
  },
  DryRun: false,
  IamInstanceProfile: {
    Name: 'ExampleEC2Role'
  },
  InstanceType: 't1.micro',
  KeyName: 'awskeypair'
};

ec2.runInstances(params, function (err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
