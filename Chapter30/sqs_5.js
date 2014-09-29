var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

var sqs = new AWS.SQS();

var params = {
  Entries: [ // 필수
    {
      Id: 'abcd1',
      ReceiptHandle: 'cOJv9qrD9XLVlpsfwYn3xQmb+PN7hPQPLvbKbLf00e/IVkoYGXIClWRjITleU8EbqAXtNiSV7T8mrLllzyQfgu0w7gaaHw8+gEHdHG7hCuZj60xWB5TI4kPjjV/MUdapjateCyEm0z65WeuxAS4Ek1l0SjmE5N/xC2dpWOLbFUckMs8XBsfXik95Y8/lXq55xFElXroXRfYS7hFdiLJMxcGXHmdcfD0QdJcpeUZm8wBUr207kWl6RSHiVbNrwtARY7z8v59MpKMF8bE+zk8DukIeAq61L7R6+2qfmcSJTqpiQwCnI9/PqQ==' // 필수
    },
    {
      Id: 'abcd2',
      ReceiptHandle: 'cOJv9qrD9XLVlpsfwYn3xQmb+PN7hPQPLvbKbLf00e/IVkoYGXIClWRjITleU8EbJo7ccHfwJEgmrLllzyQfgkCzVpECk03qgEHdHG7hCuZj60xWB5TI4kPjjV/MUdapjateCyEm0z65WeuxAS4Ek1l0SjmE5N/xC2dpWOLbFUckMs8XBsfXik95Y8/lXq55xFElXroXRfYS7hFdiLJMxTcp7lowhUMev8Z0XraO+cr06vpS/UXeOoU54BLWOy4+l3ApsTYkvVAF8bE+zk8DuglsZrJlCQSqyMrHz1q8QnYuwY2tJMtppg==' // 필수
    }
  ],
  QueueUrl: 'https://sqs.ap-northeast-1.amazonaws.com/232075047203/ExampleQueue', // 필수  
};

sqs.deleteMessageBatch(params, function (err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
