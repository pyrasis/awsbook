var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

cloudsearchdomain = new AWS.CloudSearchDomain({
  endpoint: 'search-exampledomain-vczqocfxwcndcxuxtdscb4hw5m.ap-northeast-1.cloudsearch.amazonaws.com'
});

var params = {
  query: 'dicaprio', // 필수
  sort: 'title desc',
  return: 'title,_score,actors',
  size: 3
};

cloudsearchdomain.search(params, function (err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
