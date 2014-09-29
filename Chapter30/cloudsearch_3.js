var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

cloudsearchdomain = new AWS.CloudSearchDomain({
  endpoint: 'search-exampledomain-vczqocfxwcndcxuxtdscb4hw5m.ap-northeast-1.cloudsearch.amazonaws.com'
});

var params = {
  query: 'incep', // 필수
  suggester: 'title', // 필수
  size: 3
};

cloudsearchdomain.suggest(params, function (err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
