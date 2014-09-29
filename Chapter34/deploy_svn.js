var AWS = require('aws-sdk')
  , fs = require('fs')
  , sshclient = require('sshclient')
  , async = require('async')

AWS.config.loadFromPath('./config.json');

var ec2 = new AWS.EC2({ region: 'ap-northeast-1' })
  , autoscaling = new AWS.AutoScaling({ region: 'ap-northeast-1' });

var privateKey = fs.readFileSync('../../awskeypair.pem');

function getInstanceIds(callback) {
  autoscaling.describeAutoScalingGroups({
    AutoScalingGroupNames: ['ExampleAutoScalingGroup'],
  }, function (err, data) {
    instanceIds = [];
    if (!err) {
      data.AutoScalingGroups[0].Instances.forEach(function (e) {
        instanceIds.push(e.InstanceId);
      });
    }
    callback(instanceIds);
  });
}

function getInstanceIpAddress(instanceId, callback) {
  ec2.describeInstances({
    InstanceIds: [ instanceId ]
  }, function (err, data) {
    if (err)
      console.log(err, err.stack);
    callback(data.Reservations[0].Instances[0].PublicIpAddress);
  });
}

function deploy(host) {
  sshclient.session({
    host: host,
    port: 22,
    username: 'ec2-user',
    privateKey: privateKey
  }, function (err, ses) {
    async.series([
      function (callback) {
        ses.exec('cd /home/ec2-user/ExampleWebServer; svn update', function (err, stream) {
          callback(err, stream);
        });
      }
    ], function (err, results) {
      console.log(results);
      ses.quit();
    });
  });
}

getInstanceIds(function (instanceIds) {
  instanceIds.forEach(function (e) {
    getInstanceIpAddress(e, function (ipAddress) {
      console.log(ipAddress);
      deploy(ipAddress);
    });
  });
});
