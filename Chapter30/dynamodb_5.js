var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

dynamodb = new AWS.DynamoDB();

var params = {
  RequestItems: { // 필수
    'ExampleTable': {
      Keys: [ // 필수
        {
          someKey1: {
            S: 'Hello String'
          }
        },
        {
          someKey1: {
            S: 'World String'
          }
        }
      ],
      ConsistentRead: true  
    }
  }
};

dynamodb.batchGetItem(params, function (err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
