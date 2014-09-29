var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

var elb = new AWS.ELB();

var params = {
  Instances: [ // 필수
    {
      InstanceId: 'i-0e7abc17'
    },
    {
      InstanceId: 'i-4d7bbd54'
    }
  ],
  LoadBalancerName: 'exampleelb' // 필수
};

elb.registerInstancesWithLoadBalancer(params, function (err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
