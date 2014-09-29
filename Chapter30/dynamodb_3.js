var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

dynamodb = new AWS.DynamoDB();

var params = {
  RequestItems: { // 필수
    'ExampleTable': [
      {
        DeleteRequest: {
          Key: { // 필수
            someKey1: {
              S: 'Hello String'
            }
          }
        }
      },
      {
        PutRequest: {
          Item: { // 필수
            someKey1: {
              S: 'World String'
            }
          }
        }
      }
    ]
  }
};

dynamodb.batchWriteItem(params, function (err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
