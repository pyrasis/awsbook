var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

dynamodb = new AWS.DynamoDB();

var params = {
  KeyConditions: { // 필수
    someKey1: {
      ComparisonOperator: 'EQ',
      AttributeValueList: [
        {
          S: 'Hello String'
        }
      ]
    }
  },
  TableName: 'ExampleTable', // 필수
  QueryFilter: {
    someKey3: {
      ComparisonOperator: 'EQ',
      AttributeValueList: [
        {
          N: '1'
        }
      ]
    }
  },
  ConsistentRead: true
};

dynamodb.query(params, function (err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
