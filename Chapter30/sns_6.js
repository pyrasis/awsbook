var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

var sns = new AWS.SNS();

var params = {
  PlatformApplicationArn: 'arn:aws:sns:ap-northeast-1:232075047203:app/GCM/ExampleGCM', // 필수
  Token: 'APA91bEtMOwbiMBK9xos6ASX8aylQENNmX6NQ7pHQhy4rSvUtXJzjLCOCsiOK69mwy7qu9hIEWHTmFtKCSYS0c5v_m3RojYIfy1LrcCbv9vdL12qtKAMwLFX1-MpCAC0PQa8l', // 필수
};

sns.createPlatformEndpoint(params, function (err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
