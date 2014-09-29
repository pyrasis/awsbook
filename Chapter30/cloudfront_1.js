var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

var cloudfront = new AWS.CloudFront();

var params = {
  DistributionId: 'E2BSR9DHH70GFH', // 필수
  InvalidationBatch: { // 필수
    CallerReference: 'ExampleInvalidation1', // 필수
    Paths: { // 필수
      Quantity: 2, // 필수
      Items: [
        '/index.html',
        '/hello.html'
      ]
    }
  }
};

cloudfront.createInvalidation(params, function (err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
