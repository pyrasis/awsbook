var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

dynamodb = new AWS.DynamoDB();

var params = {
  Key: { // 필수
    someKey1: {
      S: 'Hello String'
    }
  },
  TableName: 'ExampleTable', // 필수
  ConsistentRead: true
};

dynamodb.getItem(params, function (err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
