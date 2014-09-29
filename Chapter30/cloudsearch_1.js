var AWS = require('aws-sdk');
var fs = require('fs');
AWS.config.loadFromPath('./config.json');

cloudsearchdomain = new AWS.CloudSearchDomain({
  endpoint: 'doc-exampledomain2-7fq636cmiddehdtdfpa3d3s454.ap-northeast-1.cloudsearch.amazonaws.com'
});

var params = {
  contentType: 'application/json', // 필수
  documents: JSON.stringify([
    {
      'type': 'add',
      'id': '1',
      'version': 1,
      'lang': 'ko',
      'fields': {
        'name': '홍길동',
        'address': '서울시 종로구',
        'phone': '010-1234-5678',
        'rank': '대리',
        'age': 27
      }
    },
    {
      'type': 'add',
      'id': '2',
      'version': 1,
      'lang': 'ko',
      'fields': {
        'name': '이율곡',
        'address': '서울시 성북구',
        'phone': '010-4567-8901',
        'rank': '과장',
        'age': 35
      }
    }
  ])
  //documents: fs.readFileSync('./data.json')
};

cloudsearchdomain.uploadDocuments(params, function (err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
