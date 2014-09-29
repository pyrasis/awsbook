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
  AttributeUpdates: { // 필수
    someKey2: {
      Action: 'PUT',
      Value: {
        SS: [ 'Hello String 10', 'Hello String 20' ]
      }
    },
    someKey3: {
      Action: 'ADD',
      Value: {
        N: '10'
      }
    },
    someKey4: {
      Action: 'DELETE'
    },
    someKey5: {
      Action: 'PUT',
      Value: {
        B: new Buffer([10, 20, 30])
      }
    },
    someKey6: {
      Action: 'DELETE'
    }
  }
};

dynamodb.updateItem(params, function (err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
