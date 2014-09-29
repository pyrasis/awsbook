var express = require('express')
  , Sequelize = require('sequelize')
  , redis = require('redis')
  , EC2Metadata = require('ec2metadata')
  , http = require('http')
  , fs = require('fs')
  , app = express()
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

var redisEndpoint = {
  host: 'exampleticket.o5nouc.0001.apne1.cache.amazonaws.com',
  port: 6379
};
var rdsEndpoint = {
  host: 'exampleticket.cnlconsezo7y.ap-northeast-1.rds.amazonaws.com',
  port: 3306
};

// Redis Pub/Sub
var publisher = redis.createClient(redisEndpoint.port, redisEndpoint.host);
var subscriber = redis.createClient(redisEndpoint.port, redisEndpoint.host);

// MySQL DB 이름, 계정, 암호
var sequelize = new Sequelize('exampleticket', 'admin', 'adminpassword', {
  host: rdsEndpoint.host,
  port: rdsEndpoint.port,
  maxConcurrentQuries: 1024,
  logging: false
});

// MySQL DB 테이블 정의
var Seat = sequelize.define('Seat', {
  seatId: { type: Sequelize.STRING, allowNull: false, unique: true },
  actionType: { type: Sequelize.STRING, allowNull: false },
  userId: Sequelize.STRING
});

// MySQL DB 테이블 생성
sequelize.sync();

var ipAddress;

app.get(['/', '/index.html'], function (req, res) {
  fs.readFile('./index.html', function (err, data) {
    res.contentType('text/html');
    res.send(data);
  });
});

// 좌석 예약, 결제 상태 출력
app.get('/seats', function (req, res) {
  Seat.findAll({
    where: { actionType: { ne: 'cancel' } }
  }).success(function (seats) {
    var data = [];
    seats.map(function (seat) { return seat.values; }).forEach(function (e) {
      seat = e.seatId.split('-');
      data.push({
        row: seat[0],
        col: seat[1],
        actionType: e.actionType,
        userId: e.userId
      });
    });
    res.header('Cache-Control', 'max-age=0, s-maxage=0, public');
    res.send(data);
  });
});

// socket.io에 접속할 IP 주소 전달
app.get('/ip', function (req, res) {
  res.header('Cache-Control', 'max-age=0, s-maxage=0, public');
  if (!ipAddress) {
    EC2Metadata.get(['public-ipv4'], function (err, data) {
      ipAddress = data.publicIpv4;
      res.send(ipAddress);
    });
  }
  else {
    res.send(ipAddress);
  }
});

// 좌석 예약, 결제 처리
io.sockets.on('connection', function (socket) {
  socket.on('action', function (data) {
    Seat.find({
      where: { seatId: data.row + '-' + data.col }
    }).success(function (seat) {
      if (seat == null ||
          seat.userId == data.userId ||
          seat.actionType == 'cancel') {
        
        if (seat == null)
          seat = Seat.build();
        seat.seatId = data.row + '-' + data.col;
        seat.userId = data.userId;
        seat.actionType = data.actionType;
        seat.save().success(function () {
          publisher.publish('seat', JSON.stringify(data));
        });
      }
    });
  });
});

// 실시간으로 좌석 상태 개신
subscriber.subscribe('seat');
subscriber.on('message', function (channel, message) {
  io.sockets.emit('result', JSON.parse(message));
});

server.listen(80);
