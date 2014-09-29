var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

var sqs = new AWS.SQS();

var params = {
  QueueUrl: 'https://sqs.ap-northeast-1.amazonaws.com/232075047203/ExampleQueue', // 필수
  ReceiptHandle: 'cOJv9qrD9XLVlpsfwYn3xQmb+PN7hPQP9bttg4XRtlLJjwucxyntVfmsdEyaM79mad79Gd9kyG0mrLllzyQfgnAWr35aKF30LcDZGfTymgxNYGqDqUkNSi4kmQpkyWpx5rqxlfYwK87goD/mGDmlBpwEICkG+XX1qcNuv6qZVhChCiIvk6zEudwxKM5RSBUuaoQayrQyEGWsbW+F5UUXGfquwshpwrkGFrusptDAV37R6mhqc9fgShkIPhqj948fc6+pVsx/K91l3TzeWE2RRUx/5VoUtwvFTL2pfGg5VzYxCH3CgDp5TQ==', // 필수
};

sqs.deleteMessage(params, function (err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
