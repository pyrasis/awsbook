var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
AWS.config.update({ region: 'us-west-2' });

var ses = new AWS.SES();

ses.getSendQuota({}, function (err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
