var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

dynamodb = new AWS.DynamoDB();

var params = {
  Item: { // 필수
    someKey1: {
      S: 'Hello String'
    },
    someKey2: {
      SS: [ 'Hello String 1', 'Hello String 2' ]
    },
    someKey3: {
      N: '1'
    },
    someKey4: {
      NS: [ '1', '2' ]
    },
    someKey5: {
      B: new Buffer([1, 2, 3])
    },
    someKey6: {
      BS: [ new Buffer([1, 2, 3]), new Buffer([4, 5, 6]) ]
    }
  },
  TableName: 'ExampleTable' // 필수
};

dynamodb.putItem(params, function (err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
