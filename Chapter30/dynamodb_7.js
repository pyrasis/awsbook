var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

dynamodb = new AWS.DynamoDB();

var params = {
  TableName: 'ExampleTable', // 필수
  ScanFilter: {
    someKey3: {
      ComparisonOperator: 'EQ',
      AttributeValueList: [
        {
          N: '1'
        }
      ]
    }
  },
};

dynamodb.scan(params, function (err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
