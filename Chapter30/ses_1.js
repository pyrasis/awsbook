var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
AWS.config.update({ region: 'us-west-2' });

var ses = new AWS.SES();

var params = {
  Destination: { // 필수
    BccAddresses: [],
    CcAddresses: [],
    ToAddresses: [ 'pyrasis@gmail.com' ]
  },
  Message: { // 필수
    Body: { // 필수
      Text: {
        Data: 'Hello SES', // 필수
        Charset: 'utf-8'
      },
    },
    Subject: { // 필수
      Data: 'Hello', // 필수
      Charset: 'utf-8'
    }
  },
  Source: 'noreply@gaas.io', // 필수
  ReplyToAddresses: [],
  ReturnPath: 'admin@gaas.io'
};

ses.sendEmail(params, function (err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
